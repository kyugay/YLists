using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;
using YLists.DAL;
using YLists.DAL.Models;

namespace YLists.BL.Services
{
    public class FieldMetadataDataService : DataService<FieldMetadata, FieldMetadataViewModel>, IFieldMetadataDataService
    {
        public FieldMetadataDataService(
            ApplicationContext context,
            IMapper mapper) :
            base(context, mapper)
        {
        }

        public override IQueryable<FieldMetadata> GetQuery()
        {
            return _context.FieldsMetadata
                .Include(fm => fm.FieldOptionCollection)
                    .ThenInclude(foc => foc.FieldOptions);
        }
    }
}
