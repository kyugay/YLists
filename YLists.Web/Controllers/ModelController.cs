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


        /*
        POST	/api/Models/Train Обучение модели с помощью файла
        POST	/api/Models/Train/{id} Обучение модели с помощью проставленных вручную категорий для всех элементов шаблона по Id
        POST	/api/Models/Categorize/{id}	Проставление категории элемента по Id с использованием ML
        POST	/api/Models/CategorizeAll/{id}	Проставление категории всех элементов шаблона по Id с использованием ML
        */
    }
}
