using YLists.BL.ViewModels;
using YLists.DAL.Models;

namespace YLists.BL.Contracts
{
    public interface IEntityTemplateDataService : IDataService<EntityTemplate, EntityTemplateViewModel>
    {
        void GenerateMultiCreationTemplate(Guid entityTemplateId, Stream output);
    }
}
