using Microsoft.AspNetCore.Mvc;
using YLists.BL.Contracts;
using YLists.BL.Queries;
using YLists.BL.ViewModels;

namespace YLists.Web.Controllers
{
    [ApiController]
    [Route("api/Entity")]
    public class EntityController : Controller
    {
        private readonly IEntityDataService _entityDataService;

        public EntityController(IEntityDataService entityDataService)
        {
            _entityDataService = entityDataService;
        }

        [HttpPost]
        [Route("Create")]
        public Guid Create(EntityViewModel model)
        {
            return _entityDataService.Create(model);
        }

        [HttpGet]
        [Route("GetAll")]
        public EntityViewModel[] GetAll()
        {
            return _entityDataService.GetAllViewModels();
        }

        [HttpPost]
        [Route("GetAllQueried")]
        public EntityViewModel[] GetAllQueried(EntityQuery query)
        {
            return _entityDataService.GetAllViewModels(query);
        }

        [HttpGet]
        [Route("Get")]
        public EntityViewModel Get(Guid id)
        {
            var res = _entityDataService.GetViewModel(id);
            return res;
        }

        [HttpPut]
        [Route("Update")]
        public void Update(EntityViewModel model)
        {
            _entityDataService.Update(model);
        }

        [HttpDelete]
        [Route("Delete")]
        public void Delete(Guid id)
        {
            _entityDataService.Delete(id);
        }
    }
}
