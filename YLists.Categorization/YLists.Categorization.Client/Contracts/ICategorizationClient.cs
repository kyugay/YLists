using YLists.Categorization.Client.DTO;

namespace YLists.Categorization.Client.Contracts
{
    public interface ICategorizationClient
    {
        Task<string> TrainAsync(string templateId, string language, TrainingItem[] trainingItems);

        Task<string> TuneAsync(string templateId, string language, string timestamp, TrainingItem[] trainingItems);

        Task<CategorizeItem[]> CategorizeAsync(string templateId, string language, string timestamp, CategorizeItem[] entities);
    }
}
