namespace YLists.BL.ViewModels
{
    public class EntityViewModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }

        public Guid? EntityTemplateId { get; set; }
        public EntityTemplateViewModel EntityTemplate { get; set; }

        public Guid? OwnerId { get; set; }
        public IdentityUserViewModel Owner { get; set; }

        public List<EntityFieldValueViewModel> EntityFieldValues { get; set; }

        public List<EntityCategoryViewModel> Categories { get; set; }
    }
}
