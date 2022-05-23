using Microsoft.AspNetCore.Identity;

namespace YLists.DAL.Models
{
    public class Category : BaseEntity
    {
        public Category()
        {
            Children = new List<Category>();
            Entities = new List<Entity>();
        }

        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }

        public Guid? ParentId { get; set; }
        public Category? Parent { get; set; }

        public Guid OwnerId { get; set; }
        public IdentityUser<Guid> Owner { get; set; }

        public List<Category> Children { get; set; }

        public List<Entity> Entities { get; set; }
    }
}
