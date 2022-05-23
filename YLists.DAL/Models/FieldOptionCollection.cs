using Microsoft.AspNetCore.Identity;

namespace YLists.DAL.Models
{
    public class FieldOptionCollection : BaseEntity
    {
        public FieldOptionCollection()
        {
            FieldOptions = new List<FieldOption>();
            FieldsMetadata = new List<FieldMetadata>();
        }

        public string Name { get; set; }

        public Guid OwnerId { get; set; }
        public IdentityUser<Guid> Owner { get; set; }

        public List<FieldOption> FieldOptions { get; set; }

        public List<FieldMetadata> FieldsMetadata { get; set; }
    }
}
