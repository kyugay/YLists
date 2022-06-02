using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;
using YLists.DAL;
using YLists.DAL.Models;

namespace YLists.BL.Services
{
    public class EntityTemplateDataService : DataService<EntityTemplate, EntityTemplateViewModel>, IEntityTemplateDataService
    {
        private readonly IAccountService _accountService;
        private readonly IBlockMetadataDataService _blockMetadataDataService;
        private readonly IFieldMetadataDataService _fieldMetadataDataService;

        public EntityTemplateDataService(
            ApplicationContext context,
            IAccountService accountService,
            IBlockMetadataDataService blockMetadataDataService,
            IFieldMetadataDataService fieldMetadataDataService,
            IMapper mapper) :
            base(context, mapper)
        {
            _accountService = accountService;
            _blockMetadataDataService = blockMetadataDataService;
            _fieldMetadataDataService = fieldMetadataDataService;
        }

        public override Guid Create(EntityTemplateViewModel model)
        {
            var template = _mapper.Map<EntityTemplate>(model);
            template.Owner = _accountService.GetCurrentUserAsync().Result;

            return base.Create(template);
        }

        public override IQueryable<EntityTemplate> GetQuery()
        {
            var currentUserId = _accountService.GetCurrentUserId();

            return _context.EntityTemplates
                .Include(et => et.BlocksMetadata)
                    .ThenInclude(bm => bm.FieldsMetadata)
                    .ThenInclude(fm => fm.FieldOptionCollection)
                    .ThenInclude(foc => foc.FieldOptions)
                .Where(et => et.OwnerId == currentUserId);
        }

        public override void Update(EntityTemplateViewModel model)
        {
            var currentUser = _accountService.GetCurrentUserAsync().Result;

            var template = _mapper.Map<EntityTemplate>(model);
            template.Owner = _accountService.GetCurrentUserAsync().Result;

            base.Update(template);

            template.BlocksMetadata.ForEach(block => {
                block.EntityTemplateId = template.Id;
                block.EntityTemplate = template;
            });

            _blockMetadataDataService.Update(template.BlocksMetadata);
            _blockMetadataDataService.Delete((block) =>
                block.EntityTemplateId == template.Id && !template.BlocksMetadata.Select(b => b.Id).Contains(block.Id)
            );


            template.BlocksMetadata.ForEach(block => {
                block.FieldsMetadata.ForEach(field => {
                    field.BlockMetadataId = block.Id;
                    field.BlockMetadata = block;

                    if (field.FieldOptionCollection != null)
                        field.FieldOptionCollection.Owner = currentUser;
                });

                _fieldMetadataDataService.Update(block.FieldsMetadata);
                _fieldMetadataDataService.Delete((field) =>
                    field.BlockMetadataId == block.Id && !block.FieldsMetadata.Select(f => f.Id).Contains(field.Id)
                );
            });

        }
    }
}
