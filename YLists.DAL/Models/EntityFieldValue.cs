namespace YLists.DAL.Models
{
    public class EntityFieldValue : BaseEntity
    {
        public EntityFieldValue() { }

        public string Value { get; set; }

        public Guid FieldMetadataId { get; set; }
        public FieldMetadata FieldMetadata { get; set; }

        public Guid EntityId { get; set; }
        public Entity Entity { get; set; }
    }
}
