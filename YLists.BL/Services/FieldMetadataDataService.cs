using AutoMapper;
using EFCore.BulkExtensions;
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

        /*public override void Update(FieldMetadataViewModel model)
        {
            var config = new BulkConfig()
            {
                PropertiesToExclude = new List<string> { nameof(FieldMetadata.BlockMetadataId) },
                //IncludeGraph = true,
            };

            base.Update(model, config);
        }

        public override void Update(IEnumerable<FieldMetadataViewModel> models)
        {
            var config = new BulkConfig()
            {
                PropertiesToExclude = new List<string> { nameof(FieldMetadata.BlockMetadataId) },
                //IncludeGraph = true,
            };

            base.Update(models, config);
        }*/
    }
}
