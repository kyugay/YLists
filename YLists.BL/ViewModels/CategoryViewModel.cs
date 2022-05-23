namespace YLists.BL.ViewModels
{
    public class CategoryViewModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public DateTime? CreatedDate { get; set; }

        public Guid? ParentId { get; set; }
        public CategoryViewModel? Parent { get; set; }

        public Guid? OwnerId { get; set; }

        public List<CategoryViewModel>? Children { get; set; }
    }
}
