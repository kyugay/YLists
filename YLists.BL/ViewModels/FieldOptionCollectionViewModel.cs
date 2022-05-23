namespace YLists.BL.ViewModels
{
    public class FieldOptionCollectionViewModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }

        public Guid? OwnerId { get; set; }
        public IdentityUserViewModel Owner { get; set; }

        public List<FieldOptionViewModel> FieldOptions { get; set; }
    }
}
