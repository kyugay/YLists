using YLists.Categorization.Client.DTO;
using YLists.DAL.Models;

namespace YLists.BL.Contracts
{
    public interface ICategorizationService
    {
        Task<Model> TrainFromTemplateAsync(string name, Guid templateId, string language);

        Task<Model> TrainAsync(string name, Guid templateId, string language, TrainingItem[] trainingItems);

        Task<Model> TuneAsync(Guid modelId);

        Task CategorizeAsync(Guid modelId, Guid[] entitiesId);
    }
}
