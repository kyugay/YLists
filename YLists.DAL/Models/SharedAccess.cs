using Microsoft.AspNetCore.Identity;
using YLists.DAL.Enums;

namespace YLists.DAL.Models
{
    public class SharedAccess : BaseEntity
    {
        public SharedAccessType Type { get; set; }
        public Guid? TemplateId { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? EntityId { get; set; }
        public DateTime CreatedDate { get; set; }

        public Guid CreatorId { get; set; }
        public IdentityUser<Guid> Creator { get; set; }
    }
}
