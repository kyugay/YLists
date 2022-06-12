using YLists.BL.Queries;
using YLists.BL.ViewModels;
using YLists.DAL.Models;

namespace YLists.BL.Contracts
{
    public interface ISharedAccessService
    {
        string Create(SharedAccessViewModel model);

        SharedAccess Get(Guid sharedAccessId);
        SharedAccessViewModel GetViewModel(Guid sharedAccessId);

        EntityTemplateViewModel[] GetAllTemplateViewModels(Guid sharedAccessId);
        CategoryViewModel[] GetAllCategoryViewModels(Guid sharedAccessId, CategoryQuery query);
        EntityViewModel[] GetAllEntityViewModels(Guid sharedAccessId, EntityQuery query);
        EntityViewModel GetEntityViewModel(Guid sharedAccessId, Guid entityId);
    }
}
