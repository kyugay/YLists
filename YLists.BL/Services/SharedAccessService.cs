using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using YLists.BL.Contracts;
using YLists.BL.Queries;
using YLists.BL.ViewModels;
using YLists.DAL;
using YLists.DAL.Enums;
using YLists.DAL.Models;

namespace YLists.BL.Services
{
    public class SharedAccessService : ISharedAccessService
    {
        private readonly ApplicationContext _context;
        private readonly IAccountService _accountService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMapper _mapper;

        public SharedAccessService(
            ApplicationContext context,
            IAccountService accountService,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper)
        {
            _context = context;
            _accountService = accountService;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }

        public string Create(SharedAccessViewModel model)
        {
            var currentUser = _accountService.GetCurrentUserAsync().Result;

            var sharedAccess = _mapper.Map<SharedAccess>(model);

            sharedAccess.CreatorId = currentUser.Id;
            sharedAccess.Creator = currentUser;

            _context.Add(sharedAccess);
            _context.SaveChanges();

            var queryParams = !sharedAccess.TemplateId.HasValue && !sharedAccess.CategoryId.HasValue ? "" :
                sharedAccess.TemplateId.HasValue ? $"?templateId={ sharedAccess.TemplateId.Value }" :
                sharedAccess.CategoryId.HasValue ? $"?categoryId={ sharedAccess.CategoryId.Value }" :
                $"?templateId={ sharedAccess.TemplateId.Value }&categoryId={ sharedAccess.CategoryId.Value }";

            return string.Format("{0}://{1}/entities/shared/{2}/{3}",
                _httpContextAccessor.HttpContext.Request.Scheme,
                _httpContextAccessor.HttpContext.Request.Host,
                sharedAccess.Id,
                sharedAccess.Type switch {
                    SharedAccessType.ForAllTemplates => "list",
                    SharedAccessType.ForTemplate => $"list/{ sharedAccess.TemplateId.Value }",
                    SharedAccessType.ForCategory => $"list/{ sharedAccess.TemplateId }{ queryParams }",
                    SharedAccessType.ForEntity => $"card/{ sharedAccess.EntityId.Value }{ queryParams }",
                    _ => throw new Exception($"Unknown shared access type { sharedAccess.Type }")
                });
        }

        public SharedAccess Get(Guid sharedAccessId)
        {
            return _context.SharedAccesses
                .AsNoTracking()
                .Include(sa => sa.Creator)
                .FirstOrDefault(sa => sa.Id == sharedAccessId) ??
                throw new Exception($"Shared access with Id {sharedAccessId} not found");
        }

        public SharedAccessViewModel GetViewModel(Guid sharedAccessId)
        {
            var sharedAccess = Get(sharedAccessId);

            return _mapper.Map<SharedAccessViewModel>(sharedAccess);
        }

        public EntityTemplateViewModel[] GetAllTemplateViewModels(Guid sharedAccessId)
        {
            var sharedAccess = Get(sharedAccessId);

            var templates = _context.EntityTemplates
                .AsNoTracking()
                .Include(et => et.BlocksMetadata)
                    .ThenInclude(bm => bm.FieldsMetadata)
                    .ThenInclude(fm => fm.FieldOptionCollection)
                    .ThenInclude(foc => foc.FieldOptions)
                .Where(et => et.OwnerId == sharedAccess.CreatorId);

            return _mapper.ProjectTo<EntityTemplateViewModel>(templates).ToArray();
        }

        public CategoryViewModel[] GetAllCategoryViewModels(Guid sharedAccessId, CategoryQuery query)
        {
            var sharedAccess = Get(sharedAccessId);

            _context.Categories
                .AsNoTracking()
                .Where(c => c.OwnerId == sharedAccess.CreatorId)
                .Load();

            var categories = _context.Categories
                .AsNoTracking()
                .Include(c => c.Owner)
                .Include(c => c.Entities)
                .Where(c => c.OwnerId == sharedAccess.CreatorId);

            categories = query.ApplyQuery(categories);

            return _mapper.ProjectTo<CategoryViewModel>(categories).ToArray();
        }

        public EntityViewModel[] GetAllEntityViewModels(Guid sharedAccessId, EntityQuery query)
        {
            var sharedAccess = Get(sharedAccessId);

            var entities = _context.Entities
                .AsNoTracking()
                .Include(e => e.EntityTemplate)
                    .ThenInclude(et => et.BlocksMetadata)
                    .ThenInclude(bm => bm.FieldsMetadata)
                    .ThenInclude(fm => fm.FieldOptionCollection)
                    .ThenInclude(foc => foc.FieldOptions)
                .Include(e => e.Owner)
                .Include(e => e.EntityFieldValues)
                    .ThenInclude(fv => fv.FieldMetadata)
                .Include(e => e.Categories)
                .Where(e => e.OwnerId == sharedAccess.CreatorId);

            entities = query.ApplyQuery(entities);

            return _mapper.ProjectTo<EntityViewModel>(entities).ToArray();
        }

        public EntityViewModel GetEntityViewModel(Guid sharedAccessId, Guid entityId)
        {
            var sharedAccess = Get(sharedAccessId);

            var entity = _context.Entities
                .AsNoTracking()
                .Include(e => e.EntityTemplate)
                    .ThenInclude(et => et.BlocksMetadata)
                    .ThenInclude(bm => bm.FieldsMetadata)
                    .ThenInclude(fm => fm.FieldOptionCollection)
                    .ThenInclude(foc => foc.FieldOptions)
                .Include(e => e.Owner)
                .Include(e => e.EntityFieldValues)
                    .ThenInclude(fv => fv.FieldMetadata)
                .Include(e => e.Categories)
                .FirstOrDefault(e => e.OwnerId == sharedAccess.CreatorId && e.Id == entityId);

            return _mapper.Map<EntityViewModel>(entity);
        }
    }
}
