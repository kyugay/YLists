using Grpc.Core;
using YLists.Categorization.Client.Generated;

namespace YLists.Categorization.Client
{
    public class CategorizationClient
    {
        private Channel _channel;
        private Generated.Categorization.CategorizationClient _client;

        public CategorizationClient()
        {
            _channel = new Channel("127.0.0.1:50051", ChannelCredentials.Insecure);
            _client = new Generated.Categorization.CategorizationClient(_channel);
        }

        public async Task TrainAsync(string templateId, Dictionary<string, string> categoryEntityPairs)
        {
            var request = new TrainRequest
            {
                TemplateId = templateId
            };
            request.Items.AddRange(categoryEntityPairs.Select(gr => new TrainRequest.Types.Item {
                CategoryName = gr.Key,
                EntityName = gr.Value
            }));

            await _client.TrainAsync(request);
        }
    }
}
