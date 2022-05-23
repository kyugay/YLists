namespace YLists.BL.ViewModels
{
    public class EntityCategoryViewModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public DateTime? CreatedDate { get; set; }

        public Guid? ParentId { get; set; }

        public Guid? OwnerId { get; set; }
    }
}
