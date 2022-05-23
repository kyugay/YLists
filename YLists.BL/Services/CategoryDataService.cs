using AutoMapper;
using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;
using YLists.DAL;
using YLists.DAL.Models;

namespace YLists.BL.Services
{
    public class CategoryDataService : DataService<Category, CategoryViewModel>, ICategoryDataService
    {
        private readonly IAccountService _accountService;

        public CategoryDataService(
            ApplicationContext context,
            IAccountService accountService,
            IMapper mapper) :
            base(context, mapper)
        {
            _accountService = accountService;
        }

        public override Guid Create(CategoryViewModel model)
        {
            var category = _mapper.Map<Category>(model);
            category.Owner = _accountService.GetCurrentUserAsync().Result;
            category.CreatedDate = DateTime.Now;

            return base.Create(category);
        }

        public override IQueryable<Category> GetQuery()
        {
            var currentUserId = _accountService.GetCurrentUserId();

            _context.Categories
                .Where(c => c.OwnerId == currentUserId)
                .Load();

            return _context.Categories
                .Include(c => c.Owner)
                .Include(c => c.Entities)
                //.Include(c => c.Children)
                .Where(c => c.OwnerId == currentUserId);
        }

        public override void Update(CategoryViewModel model)
        {
            var category = _mapper.Map<Category>(model);
            category.Owner = _accountService.GetCurrentUserAsync().Result;

            base.Update(category);
        }

        public CategoryViewModel[] GetTreeListViewModels()
        {
            var categories = GetQuery().Where(c => c.ParentId == null).ToArray();
            var res = _mapper.Map<CategoryViewModel[]>(categories);
            return res;
        }
    }
}
