namespace YLists.BL.ViewModels
{
    public class EntityTemplateViewModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public int Columns { get; set; }

        public Guid? OwnerId { get; set; }
        public IdentityUserViewModel Owner { get; set; }

        public List<BlockMetadataViewModel> BlocksMetadata { get; set; }
    }
}
