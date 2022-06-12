using Microsoft.AspNetCore.Mvc;
using YLists.BL.Contracts;
using YLists.BL.Queries;
using YLists.BL.ViewModels;

namespace YLists.Web.Controllers
{
    [ApiController]
    [Route("api/SharedAccess")]
    public class SharedAccessController : Controller
    {
        private readonly ISharedAccessService _sharedAccessService;

        public SharedAccessController(ISharedAccessService sharedAccessService)
        {
            _sharedAccessService = sharedAccessService;
        }

        [HttpPost]
        [Route("Create")]
        public string Create(SharedAccessViewModel model)
        {
            return _sharedAccessService.Create(model);
        }

        [HttpGet]
        [Route("Get")]
        public SharedAccessViewModel Get(Guid id)
        {
            return _sharedAccessService.GetViewModel(id);
        }

        [HttpGet]
        [Route("GetAllTemplates")]
        public EntityTemplateViewModel[] GetAllTemplates(Guid sharedAccessId)
        {
            return _sharedAccessService.GetAllTemplateViewModels(sharedAccessId);
        }

        [HttpPost]
        [Route("GetAllQueriedCategories")]
        public CategoryViewModel[] GetAllQueriedCategories(Guid sharedAccessId, CategoryQuery query)
        {
            return _sharedAccessService.GetAllCategoryViewModels(sharedAccessId, query);
        }

        [HttpPost]
        [Route("GetAllQueriedEntities")]
        public EntityViewModel[] GetAllQueriedEntities(Guid sharedAccessId, EntityQuery query)
        {
            return _sharedAccessService.GetAllEntityViewModels(sharedAccessId, query);
        }

        [HttpGet]
        [Route("GetEntity")]
        public EntityViewModel GetEntity(Guid sharedAccessId, Guid entityId)
        {
            return _sharedAccessService.GetEntityViewModel(sharedAccessId, entityId);
        }
    }
}
