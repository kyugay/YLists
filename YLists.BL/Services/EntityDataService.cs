using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;
using YLists.DAL;
using YLists.DAL.Models;

namespace YLists.BL.Services
{
    public class EntityDataService : DataService<Entity, EntityViewModel>, IEntityDataService
    {
        private readonly IAccountService _accountService;

        public EntityDataService(
            ApplicationContext context,
            IAccountService accountService,
            IMapper mapper) :
            base(context, mapper)
        {
            _accountService = accountService;
        }

        public override Guid Create(EntityViewModel model)
        {
            var entity = _mapper.Map<Entity>(model);

            _context.Attach(entity);

            entity.Owner = _accountService.GetCurrentUserAsync().Result;

            return base.Create(entity);
        }

        public override IQueryable<Entity> GetQuery()
        {
            var currentUserId = _accountService.GetCurrentUserId();

            return _context.Entities
                .Include(e => e.EntityTemplate)
                    .ThenInclude(et => et.BlocksMetadata)
                    .ThenInclude(bm => bm.FieldsMetadata)
                    .ThenInclude(fm => fm.FieldOptionCollection)
                    .ThenInclude(foc => foc.FieldOptions)
                .Include(e => e.Owner)
                .Include(e => e.EntityFieldValues)
                    .ThenInclude(fv => fv.FieldMetadata)
                .Include(e => e.Categories)
                .Where(e => e.OwnerId == currentUserId);
        }

        public override void Update(EntityViewModel model)
        {
            var entity = Get(model.Id.Value);

            _context.Attach(entity);

            entity = _mapper.Map(model, entity);
            entity.Owner = _accountService.GetCurrentUserAsync().Result;

            base.Update(entity);
        }
    }
}
