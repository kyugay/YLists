using Microsoft.AspNetCore.Identity;

namespace YLists.DAL.Models
{
    public class EntityTemplate : BaseEntity
    {
        public EntityTemplate()
        {
            Entities = new List<Entity>();
            BlocksMetadata = new List<BlockMetadata>();
            Categories = new List<Category>();
            Models = new List<Model>();
        }

        public string Name { get; set; }
        public int Columns { get; set; }

        public Guid OwnerId { get; set; }
        public IdentityUser<Guid> Owner { get; set; }

        public List<Entity> Entities { get; set; }

        public List<BlockMetadata> BlocksMetadata { get; set; }

        public List<Category> Categories { get; set; }

        public List<Model> Models { get; set; }
    }
}
