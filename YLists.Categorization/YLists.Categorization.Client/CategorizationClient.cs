using Grpc.Core;
using YLists.Categorization.Client.Contracts;
using YLists.Categorization.Client.DTO;
using YLists.Categorization.Client.Generated;

namespace YLists.Categorization.Client
{
    public class CategorizationClient : ICategorizationClient
    {
        private Channel _channel;
        private Generated.Categorization.CategorizationClient _client;

        public CategorizationClient()
        {
            _channel = new Channel("127.0.0.1:50550", ChannelCredentials.Insecure);
            _client = new Generated.Categorization.CategorizationClient(_channel);
        }

        public async Task<string> TrainAsync(string templateId, string language, TrainingItem[] trainingItems)
        {
            var request = new TrainRequest
            {
                TemplateId = templateId,
                Language = language,
            };
            request.Items.AddRange(trainingItems.Select(ti => new TrainRequest.Types.Item {
                Name = ti.Name,
                Category = ti.Category
            }));

            var response = await _client.TrainAsync(request);

            return response.Timestamp;
        }

        public async Task<string> TuneAsync(string templateId, string language, string timestamp, TrainingItem[] trainingItems)
        {
            var request = new TuneRequest
            {
                TemplateId = templateId,
                Language = language,
                Timestamp = timestamp,
            };
            request.Items.AddRange(trainingItems.Select(ti => new TuneRequest.Types.Item
            {
                Name = ti.Name,
                Category = ti.Category
            }));

            var response = await _client.TuneAsync(request);

            return response.Timestamp;
        }

        public async Task<CategorizeItem[]> CategorizeAsync(string templateId, string language, string timestamp, CategorizeItem[] entities)
        {
            var request = new CategorizeRequest
            {
                TemplateId = templateId,
                Language = language,
                Timestamp = timestamp,
            };
            request.Items.AddRange(entities.Select(e => new CategorizeRequest.Types.Item
            {
                Id = e.Id.ToString(),
                Name = e.Name
            }));

            var response = await _client.CategorizeAsync(request);

            return response.Items
                .Select(i => new CategorizeItem {
                    Id = Guid.Parse(i.Id),
                    Category = i.Category,
                    Probability = i.Probability
                }).ToArray();
        }
    }
}
