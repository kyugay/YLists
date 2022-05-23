using Microsoft.AspNetCore.Mvc;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;

namespace YLists.Web.Controllers
{
    [ApiController]
    [Route("api/FieldOptionCollection")]
    public class FieldOptionCollectionController : Controller
    {
        private readonly IFieldOptionCollectionDataService _fieldOptionCollectionDataService;

        public FieldOptionCollectionController(IFieldOptionCollectionDataService fieldOptionCollectionDataService)
        {
            _fieldOptionCollectionDataService = fieldOptionCollectionDataService;
        }

        [HttpPost]
        [Route("Create")]
        public Guid Create(FieldOptionCollectionViewModel model)
        {
            return _fieldOptionCollectionDataService.Create(model);
        }

        [HttpGet]
        [Route("GetAll")]
        public FieldOptionCollectionViewModel[] GetAll()
        {
            return _fieldOptionCollectionDataService.GetAllViewModels();
        }

        [HttpGet]
        [Route("Get")]
        public FieldOptionCollectionViewModel Get(Guid id)
        {
            return _fieldOptionCollectionDataService.GetViewModel(id);
        }

        [HttpPut]
        [Route("UpdateRange")]
        public void UpdateRange(FieldOptionCollectionViewModel[] models)
        {
            _fieldOptionCollectionDataService.Update(models);
        }

        [HttpPut]
        [Route("Update")]
        public void Update(FieldOptionCollectionViewModel model)
        {
            _fieldOptionCollectionDataService.Update(model);
        }

        [HttpDelete]
        [Route("Delete")]
        public void Delete(Guid id)
        {
            _fieldOptionCollectionDataService.Delete(id);
        }
    }
}
