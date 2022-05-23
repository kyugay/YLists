using Microsoft.AspNetCore.Identity;

namespace YLists.DAL.Models
{
    public class Entity : BaseEntity
    {
        public Entity()
        {
            EntityFieldValues = new List<EntityFieldValue>();
            Categories = new List<Category>();
        }

        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }

        public Guid EntityTemplateId { get; set; }
        public EntityTemplate EntityTemplate { get; set; }

        public Guid OwnerId { get; set; }
        public IdentityUser<Guid> Owner { get; set; }

        public List<EntityFieldValue> EntityFieldValues { get; set; }

        public List<Category> Categories { get; set; }
    }
}
