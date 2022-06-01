using YLists.BL.ViewModels;
using YLists.DAL.Models;

namespace YLists.BL.Contracts
{
    public interface ICategoryDataService : IDataService<Category, CategoryViewModel>
    {
        CategoryViewModel[] GetTreeListViewModels(string templateId);
    }
}
