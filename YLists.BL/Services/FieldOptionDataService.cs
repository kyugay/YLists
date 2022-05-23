using AutoMapper;
using EFCore.BulkExtensions;
using Microsoft.EntityFrameworkCore;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;
using YLists.DAL;
using YLists.DAL.Models;

namespace YLists.BL.Services
{
    public class FieldOptionDataService : DataService<FieldOption, FieldOptionViewModel>, IFieldOptionDataService
    {
        public FieldOptionDataService(
            ApplicationContext context,
            IMapper mapper) :
            base(context, mapper)
        {
        }

        public override IQueryable<FieldOption> GetQuery()
        {
            return _context.FieldOptions
                .Include(fo => fo.FieldOptionCollection);
        }
    }
}
