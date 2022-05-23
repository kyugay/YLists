using YLists.DAL.Enums;

namespace YLists.DAL.Models
{
    public class FieldMetadata : BaseEntity
    {
        public FieldMetadata()
        {
            EntityFieldValues = new List<EntityFieldValue>();
        }

        public FieldType Type { get; set; }
        public string Label { get; set; }
        public int Order { get; set; }

        public Guid BlockMetadataId { get; set; }
        public BlockMetadata BlockMetadata { get; set; }

        public Guid? FieldOptionCollectionId { get; set; }
        public FieldOptionCollection FieldOptionCollection { get; set; }

        public List<EntityFieldValue> EntityFieldValues { get; set; }
    }
}
