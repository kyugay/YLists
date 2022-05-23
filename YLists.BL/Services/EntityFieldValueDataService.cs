using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;
using YLists.DAL;
using YLists.DAL.Models;

namespace YLists.BL.Services
{
    public class EntityFieldValueDataService : DataService<EntityFieldValue, EntityFieldValueViewModel>, IEntityFieldValueDataService
    {
        public EntityFieldValueDataService(
            ApplicationContext context,
            IMapper mapper) :
            base(context, mapper)
        {
        }

        public override IQueryable<EntityFieldValue> GetQuery()
        {
            return _context.EntityFieldValues
                .Include(fv => fv.FieldMetadata)
                .Include(fv => fv.Entity);
        }
    }
}
