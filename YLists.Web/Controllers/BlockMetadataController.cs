using Microsoft.AspNetCore.Mvc;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;

namespace YLists.Web.Controllers
{
    [ApiController]
    [Route("api/BlockMetadata")]
    public class BlockMetadataController : Controller
    {
        private readonly IBlockMetadataDataService _blockMetadataDataService;

        public BlockMetadataController(IBlockMetadataDataService blockMetadataDataService)
        {
            _blockMetadataDataService = blockMetadataDataService;
        }

        [HttpPost]
        [Route("Create")]
        public Guid Create(BlockMetadataViewModel model)
        {
            return _blockMetadataDataService.Create(model);
        }

        [HttpGet]
        [Route("GetAll")]
        public BlockMetadataViewModel[] GetAll()
        {
            return _blockMetadataDataService.GetAllViewModels();
        }

        [HttpGet]
        [Route("Get")]
        public BlockMetadataViewModel Get(Guid id)
        {
            return _blockMetadataDataService.GetViewModel(id);
        }

        [HttpPut]
        [Route("Update")]
        public void Update(BlockMetadataViewModel model)
        {
            _blockMetadataDataService.Update(model);
        }

        [HttpDelete]
        [Route("Delete")]
        public void Delete(Guid id)
        {
            _blockMetadataDataService.Delete(id);
        }
    }
}
