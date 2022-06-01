using Microsoft.EntityFrameworkCore;
using YLists.BL.Contracts;
using YLists.Categorization.Client.Contracts;
using YLists.Categorization.Client.DTO;
using YLists.DAL;
using YLists.DAL.Models;

namespace YLists.BL.Services
{
    public class CategorizationService : ICategorizationService
    {
        private readonly ApplicationContext _context;
        private readonly IAccountService _accountService;
        private readonly ICategorizationClient _categorizationClient;

        public CategorizationService(
            ApplicationContext context,
            IAccountService accountService,
            ICategorizationClient categorizationClient)
        {
            _context = context;
            _accountService = accountService;
            _categorizationClient = categorizationClient;
        }

        public async Task<Model> TrainFromTemplateAsync(string name, Guid templateId, string language)
        {
            var template = _context.EntityTemplates
                .Include(et => et.Entities)
                    .ThenInclude(e => e.Categories)
                .Single(et => et.Id == templateId);

            TrainingItem[] trainingItems = template.Entities
                .SelectMany(e => e.Categories,
                    (e, c) => new TrainingItem { Name = e.Name, Category = c.Name })
                .ToArray();

            return await TrainAsync(name, templateId, language, trainingItems);
        }

        public async Task<Model> TrainAsync(string name, Guid templateId, string language, TrainingItem[] trainingItems)
        {
            var timestamp = await _categorizationClient.TrainAsync(templateId.ToString(), language, trainingItems);

            var model = new Model
            {
                Name = name,
                Language = language,
                Timestamp = timestamp,
                EntityTemplateId = templateId
            };

            model.Owner = _accountService.GetCurrentUserAsync().Result;

            _context.Models.Add(model);

            _context.SaveChanges();

            return model;
        }

        public async Task<Model> TuneAsync(Guid modelId)
        {
            var model = _context.Models
                .Include(m => m.EntityTemplate)
                    .ThenInclude(et => et.Entities)
                    .ThenInclude(e => e.Categories)
                .Single(m => m.Id == modelId);

            TrainingItem[] trainingItems = model.EntityTemplate.Entities
                .SelectMany(e => e.Categories,
                    (e, c) => new TrainingItem { Name = e.Name, Category = c.Name })
                .ToArray();

            model.Timestamp = await _categorizationClient.TuneAsync(model.EntityTemplateId.ToString(), model.Language, model.Timestamp, trainingItems);

            _context.SaveChanges();

            return model;
        }

        public async Task CategorizeAsync(Guid modelId, Guid[] entitiesId)
        {
            var currentUser = _accountService.GetCurrentUserAsync().Result;

            var model = _context.Models.Single(m => m.Id == modelId);
            var entities = _context.Entities
                .Include(e => e.Categories)
                .Where(e => entitiesId.Contains(e.Id))
                .ToList();

            var categorizeItems = entities.Select(e => new CategorizeItem { Id = e.Id, Name = e.Name }).ToArray();

            var newCategorizeItems = await _categorizationClient.CategorizeAsync(model.EntityTemplateId.ToString(), model.Language, model.Timestamp, categorizeItems);

            var newCategoryNames = newCategorizeItems.Select(ci => ci.Category).ToArray();
            var categories = _context.Categories.Where(c => newCategoryNames.Contains(c.Name)).ToList();

            newCategoryNames
                .Where(name => !categories.Any(c => c.Name == name))
                .ToList()
                .ForEach(name =>
                {
                    var category = new Category
                    {
                        Name = name,
                        EntityTemplateId = model.EntityTemplateId,
                        OwnerId = currentUser.Id
                    };

                    _context.Categories.Add(category);
                    categories.Add(category);
                });

            _context.SaveChanges();

            entities.ForEach(e => e.Categories = categories.Where(c => newCategorizeItems.Any(ci => e.Id == ci.Id && c.Name == ci.Category)).ToList());

            _context.SaveChanges();
        }
    }
}
