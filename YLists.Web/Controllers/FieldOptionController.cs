using Microsoft.AspNetCore.Mvc;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;

namespace YLists.Web.Controllers
{
    [ApiController]
    [Route("api/FieldOption")]
    public class FieldOptionController : Controller
    {
        private readonly IFieldOptionDataService _fieldOptionDataService;

        public FieldOptionController(IFieldOptionDataService fieldOptionDataService)
        {
            _fieldOptionDataService = fieldOptionDataService;
        }

        [HttpPost]
        [Route("Create")]
        public Guid Create(FieldOptionViewModel model)
        {
            return _fieldOptionDataService.Create(model);
        }

        [HttpGet]
        [Route("GetAll")]
        public FieldOptionViewModel[] GetAll()
        {
            return _fieldOptionDataService.GetAllViewModels();
        }

        [HttpGet]
        [Route("Get")]
        public FieldOptionViewModel Get(Guid id)
        {
            return _fieldOptionDataService.GetViewModel(id);
        }

        [HttpPut]
        [Route("Update")]
        public void Update(FieldOptionViewModel model)
        {
            _fieldOptionDataService.Update(model);
        }

        [HttpDelete]
        [Route("Delete")]
        public void Delete(Guid id)
        {
            _fieldOptionDataService.Delete(id);
        }
    }
}
