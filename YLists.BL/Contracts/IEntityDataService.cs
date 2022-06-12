using YLists.BL.ViewModels;
using YLists.DAL.Models;

namespace YLists.BL.Contracts
{
    public interface IEntityDataService : IDataService<Entity, EntityViewModel>
    {
        void ImportEntities(Stream fileStream, Guid templateId, Guid? categoryId = null);
    }
}
