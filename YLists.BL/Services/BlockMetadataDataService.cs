using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;
using YLists.DAL;
using YLists.DAL.Models;

namespace YLists.BL.Services
{
    public class BlockMetadataDataService : DataService<BlockMetadata, BlockMetadataViewModel>, IBlockMetadataDataService
    {
        private readonly IFieldMetadataDataService _fieldMetadataDataService;

        public BlockMetadataDataService(
            ApplicationContext context,
            IFieldMetadataDataService fieldMetadataDataService,
            IMapper mapper) :
            base(context, mapper)
        {
            _fieldMetadataDataService = fieldMetadataDataService;
        }

        public override IQueryable<BlockMetadata> GetQuery()
        {
            return _context.BlocksMetadata
                .Include(bm => bm.FieldsMetadata)
                    .ThenInclude(fm => fm.FieldOptionCollection)
                    .ThenInclude(foc => foc.FieldOptions);
        }
    }
}
