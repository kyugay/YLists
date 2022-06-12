using Microsoft.AspNetCore.Mvc;

namespace YLists.Web.Extensions
{
    public static class ControllerExtensions
    {
        public static FileStreamResult File(this ControllerBase controller, Stream file, string fileName)
        {
            return controller.File(file, "application/octet-stream", fileName);
        }

        public static FileStreamResult File(this ControllerBase controller, Action<Stream> writeAction, string fileName)
        {
            using var memoryStream = new MemoryStream();
            writeAction(memoryStream);
            memoryStream.Seek(0, SeekOrigin.Begin);

            var output = new MemoryStream();
            memoryStream.CopyTo(output);
            output.Flush();
            output.Seek(0, SeekOrigin.Begin);

            return controller.File(output, "application/octet-stream", fileName);
        }
    }
}
