import { ApiModule } from "src/app/api/api.generated";

export class FileUtils
{
    public static downloadFile(file: ApiModule.FileResponse)
    {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file.data);
        link.download = file.fileName;

        document.body.append(link);

        link.click();
        link.remove();

        setTimeout(() => URL.revokeObjectURL(link.href), 7000);
    }
}