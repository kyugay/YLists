using Microsoft.AspNetCore.Mvc;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;

namespace YLists.Web.Controllers
{
    [ApiController]
    [Route("api/Category")]
    public class CategoryController : Controller
    {
        private readonly ICategoryDataService _categoryDataService;

        public CategoryController(ICategoryDataService categoryDataService)
        {
            _categoryDataService = categoryDataService;
        }

        [HttpPost]
        [Route("Create")]
        public Guid Create(CategoryViewModel model)
        {
            return _categoryDataService.Create(model);
        }

        [HttpGet]
        [Route("GetAll")]
        public CategoryViewModel[] GetAll()
        {
            return _categoryDataService.GetAllViewModels();
        }

        [HttpGet]
        [Route("GetTreeList")]
        public CategoryViewModel[] GetTreeList()
        {
            return _categoryDataService.GetTreeListViewModels();
        }

        [HttpGet]
        [Route("Get")]
        public CategoryViewModel Get(Guid id)
        {
            return _categoryDataService.GetViewModel(id);
        }

        [HttpPut]
        [Route("Update")]
        public void Update(CategoryViewModel model)
        {
            _categoryDataService.Update(model);
        }

        [HttpDelete]
        [Route("Delete")]
        public void Delete(Guid id)
        {
            _categoryDataService.Delete(id);
        }
    }
}
