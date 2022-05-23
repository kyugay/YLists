namespace YLists.BL.ViewModels
{
    public class EntityFieldValueViewModel
    {
        public Guid? Id { get; set; }
        public string Value { get; set; }

        public Guid? FieldMetadataId { get; set; }
        public FieldMetadataViewModel FieldMetadata { get; set; }

        public Guid? EntityId { get; set; }
        public EntityViewModel Entity { get; set; }
    }
}
