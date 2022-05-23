using AutoMapper;
using Microsoft.EntityFrameworkCore;
using YLists.BL.Contracts;
using YLists.BL.ViewModels;
using YLists.DAL;
using YLists.DAL.Models;

namespace YLists.BL.Services
{
    public class FieldOptionCollectionDataService : DataService<FieldOptionCollection, FieldOptionCollectionViewModel>, IFieldOptionCollectionDataService
    {
        private readonly IAccountService _accountService;
        private readonly IFieldOptionDataService _fieldOptionDataService;

        public FieldOptionCollectionDataService(
            ApplicationContext context,
            IAccountService accountService,
            IFieldOptionDataService fieldOptionDataService,
            IMapper mapper) :
            base(context, mapper)
        {
            _accountService = accountService;
            _fieldOptionDataService = fieldOptionDataService;
        }

        public override Guid Create(FieldOptionCollectionViewModel model)
        {
            var fieldOptionCollection = _mapper.Map<FieldOptionCollection>(model);
            fieldOptionCollection.Owner = _accountService.GetCurrentUserAsync().Result;

            return base.Create(fieldOptionCollection);
        }

        public override IQueryable<FieldOptionCollection> GetQuery()
        {
            var currentUserId = _accountService.GetCurrentUserId();

            return _context.FieldOptionCollection
                .Include(foc => foc.Owner)
                .Include(foc => foc.FieldOptions)
                .Include(foc => foc.FieldsMetadata)
                .Where(foc => foc.OwnerId == currentUserId);
        }

        public override void Update(IEnumerable<FieldOptionCollection> fieldOptionCollections)
        {
            var currentUser = _accountService.GetCurrentUserAsync().Result;

            foreach (var fieldOptionCollection in fieldOptionCollections)
            {
                fieldOptionCollection.Owner = currentUser;
            }

            base.Update(fieldOptionCollections);
        }

        public override void Update(FieldOptionCollection fieldOptionCollection)
        {
            var currentUser = _accountService.GetCurrentUserAsync().Result;

            fieldOptionCollection.Owner = currentUser;

            base.Update(fieldOptionCollection);
        }
    }
}
