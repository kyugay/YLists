using Microsoft.AspNetCore.Mvc;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;
using YLists.Web.Extensions;

namespace YLists.Web.Controllers
{
    [ApiController]
    [Route("api/EntityTemplate")]
    public class EntityTemplateController : Controller
    {
        private readonly IEntityTemplateDataService _entityTemplateDataService;

        public EntityTemplateController(IEntityTemplateDataService entityTemplateDataService)
        {
            _entityTemplateDataService = entityTemplateDataService;
        }

        [HttpPost]
        [Route("Create")]
        public Guid Create(EntityTemplateViewModel model)
        {
            return _entityTemplateDataService.Create(model);
        }

        [HttpGet]
        [Route("GetAll")]
        public EntityTemplateViewModel[] GetAll()
        {
            return _entityTemplateDataService.GetAllViewModels();
        }

        [HttpGet]
        [Route("Get")]
        public EntityTemplateViewModel Get(Guid id)
        {
            return _entityTemplateDataService.GetViewModel(id);
        }

        [HttpPut]
        [Route("Update")]
        public void Update(EntityTemplateViewModel model)
        {
            _entityTemplateDataService.Update(model);
        }

        [HttpDelete]
        [Route("Delete")]
        public void Delete(Guid id)
        {
            _entityTemplateDataService.Delete(id);
        }

        [HttpPost]
        [Route("GenerateMultiCreationTemplate")]
        public FileResult GenerateMultiCreationTemplate(Guid entityTemplateId)
        {
            return this.File(stream => _entityTemplateDataService.GenerateMultiCreationTemplate(entityTemplateId, stream), "Template.xlsx");
        }
    }
}
