using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;
using YLists.DAL;
using YLists.DAL.Models;

namespace YLists.BL.Services
{
    public class ModelDataService : DataService<Model, ModelViewModel>, IModelDataService
    {
        private readonly IAccountService _accountService;

        public ModelDataService(
            ApplicationContext context,
            IAccountService accountService,
            IMapper mapper) :
            base(context, mapper)
        {
            _accountService = accountService;
        }

        public override Guid Create(ModelViewModel model)
        {
            var modelEntity = _mapper.Map<Model>(model);

            modelEntity.Owner = _accountService.GetCurrentUserAsync().Result;

            return base.Create(modelEntity);
        }

        public override IQueryable<Model> GetQuery()
        {
            var currentUserId = _accountService.GetCurrentUserId();

            return _context.Models
                .Include(m => m.EntityTemplate)
                .Where(e => e.OwnerId == currentUserId);
        }

        public override void Update(ModelViewModel model)
        {
            var modelEntity = Get(model.Id.Value);

            modelEntity = _mapper.Map(model, modelEntity);
            modelEntity.Owner = _accountService.GetCurrentUserAsync().Result;

            base.Update(modelEntity);
        }
    }
}
