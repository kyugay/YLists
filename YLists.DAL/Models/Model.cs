using Microsoft.AspNetCore.Identity;

namespace YLists.DAL.Models
{
    public class Model : BaseEntity
    {
        public Model() { }

        public string Name { get; set; }
        public string Language { get; set; }
        public string Timestamp { get; set; }

        public Guid EntityTemplateId { get; set; }
        public EntityTemplate EntityTemplate { get; set; }

        public Guid OwnerId { get; set; }
        public IdentityUser<Guid> Owner { get; set; }
    }
}
