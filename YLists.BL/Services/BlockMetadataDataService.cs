using AutoMapper;
using EFCore.BulkExtensions;
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

        /*public override void Update(IEnumerable<BlockMetadata> entities)
        {
            base.Update(entities);
        }*/

        /*public override void Update(BlockMetadataViewModel model)
        {
            //_fieldMetadataDataService.Update(model.FieldsMetadata);

            *//*var config = new BulkConfig()
            {
                PropertiesToExclude = new List<string> { nameof(BlockMetadata.EntityTemplateId) },
                //IncludeGraph = true,
            };*//*

            base.Update(model);
        }

        public override void Update(IEnumerable<BlockMetadataViewModel> models)
        {
            //_fieldMetadataDataService.Update(models.SelectMany(bm => bm.FieldsMetadata));

            *//*var config = new BulkConfig()
            {
                PropertiesToExclude = new List<string> { nameof(BlockMetadata.EntityTemplateId) },
                //IncludeGraph = true,
            };*//*

            base.Update(models);
        }*/
    }
}
