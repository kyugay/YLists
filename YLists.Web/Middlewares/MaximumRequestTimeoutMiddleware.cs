using Microsoft.Extensions.Options;
using YLists.BL.Settings;

namespace YLists.Web.Middlewares
{
	public class MaximumRequestTimeoutMiddleware
	{
		private readonly RequestDelegate _next;

		public MaximumRequestTimeoutMiddleware(RequestDelegate next)
		{
			_next = next;
		}

		public async Task Invoke(HttpContext context, IOptions<YListSettings> config)
		{
			using (var timeoutSource = CancellationTokenSource.CreateLinkedTokenSource(context.RequestAborted))
			{
				timeoutSource.CancelAfter(config.Value.MaximumRequestTimeoutConfig.Timeout);
				context.RequestAborted = timeoutSource.Token;
				await _next(context);
			}
		}
	}
}
