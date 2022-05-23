using Microsoft.AspNetCore.Mvc;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;

namespace YLists.Web.Controllers
{
    [ApiController]
    [Route("api/EntityFieldValue")]
    public class EntityFieldValueController : Controller
    {
        private readonly IEntityFieldValueDataService _entityFieldValueDataService;

        public EntityFieldValueController(IEntityFieldValueDataService entityFieldValueDataService)
        {
            _entityFieldValueDataService = entityFieldValueDataService;
        }

        [HttpPost]
        [Route("Create")]
        public Guid Create(EntityFieldValueViewModel model)
        {
            return _entityFieldValueDataService.Create(model);
        }

        [HttpGet]
        [Route("GetAll")]
        public EntityFieldValueViewModel[] GetAll()
        {
            return _entityFieldValueDataService.GetAllViewModels();
        }

        [HttpGet]
        [Route("Get")]
        public EntityFieldValueViewModel Get(Guid id)
        {
            return _entityFieldValueDataService.GetViewModel(id);
        }

        [HttpPut]
        [Route("Update")]
        public void Update(EntityFieldValueViewModel model)
        {
            _entityFieldValueDataService.Update(model);
        }

        [HttpDelete]
        [Route("Delete")]
        public void Delete(Guid id)
        {
            _entityFieldValueDataService.Delete(id);
        }
    }
}
