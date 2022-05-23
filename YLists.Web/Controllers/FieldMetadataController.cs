using Microsoft.AspNetCore.Mvc;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;

namespace YLists.Web.Controllers
{
    [ApiController]
    [Route("api/FieldMetadata")]
    public class FieldMetadataController : Controller
    {
        private readonly IFieldMetadataDataService _fieldMetadataDataService;

        public FieldMetadataController(IFieldMetadataDataService fieldMetadataDataService)
        {
            _fieldMetadataDataService = fieldMetadataDataService;
        }

        [HttpPost]
        [Route("Create")]
        public Guid Create(FieldMetadataViewModel model)
        {
            return _fieldMetadataDataService.Create(model);
        }

        [HttpGet]
        [Route("GetAll")]
        public FieldMetadataViewModel[] GetAll()
        {
            return _fieldMetadataDataService.GetAllViewModels();
        }

        [HttpGet]
        [Route("Get")]
        public FieldMetadataViewModel Get(Guid id)
        {
            return _fieldMetadataDataService.GetViewModel(id);
        }

        [HttpPut]
        [Route("Update")]
        public void Update(FieldMetadataViewModel model)
        {
            _fieldMetadataDataService.Update(model);
        }

        [HttpDelete]
        [Route("Delete")]
        public void Delete(Guid id)
        {
            _fieldMetadataDataService.Delete(id);
        }
    }
}
