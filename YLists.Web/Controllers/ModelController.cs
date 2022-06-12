using Microsoft.AspNetCore.Mvc;
using System.Text;
using TinyCsvParser;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;
using YLists.Categorization.Client.DTO;
using YLists.Web.CsvMapping;

namespace YLists.Web.Controllers
{
    [ApiController]
    [Route("api/Model")]
    public class ModelController : Controller
    {
        private IModelDataService _modelDataService;
        private ICategorizationService _categorizationService;

        public ModelController(
            IModelDataService modelDataService,
            ICategorizationService categorizationService)
        {
            _modelDataService = modelDataService;
            _categorizationService = categorizationService;
        }

        [HttpGet]
        [Route("GetAll")]
        public ModelViewModel[] GetAll()
        {
            return _modelDataService.GetAllViewModels();
        }

        [HttpPost]
        [Route("TrainFromTemplate")]
        public async Task TrainFromTemplate(string name, string language, Guid templateId)
        {
            await _categorizationService.TrainFromTemplateAsync(name, templateId, language);
        }

        [HttpPost]
        [Route("TrainFromFile")]
        public async Task TrainFromFile(string name, string language, Guid templateId, IFormFile file)
        {
            CsvParserOptions csvParserOptions = new CsvParserOptions(true, ';');
            CsvParser<TrainingItem> csvParser = new CsvParser<TrainingItem>(csvParserOptions, new CsvModelMapping());

            var trainingItems = csvParser
                .ReadFromStream(file.OpenReadStream(), Encoding.UTF8)
                .Select(_ => _.Result)
                .ToArray();

            await _categorizationService.TrainAsync(name, templateId, language, trainingItems);
        }

        [HttpPost]
        [Route("Tune")]
        public async Task Tune(Guid id)
        {
            await _categorizationService.TuneAsync(id);
        }

        [HttpDelete]
        [Route("Delete")]
        public void Delete(Guid id)
        {
            _modelDataService.Delete(id);
        }

        [HttpPost]
        [Route("Categorize")]
        public async Task Categorize(Guid modelId, Guid entityId, Guid? destinationCategoryId)
        {
            await _categorizationService.CategorizeAsync(modelId, new[] { entityId }, destinationCategoryId);
        }

        [HttpPost]
        [Route("CategorizeAll")]
        public async Task CategorizeAll(Guid modelId, Guid[] entitiesId)
        {
            await _categorizationService.CategorizeAsync(modelId, entitiesId);
        }
    }
}
