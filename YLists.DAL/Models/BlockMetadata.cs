namespace YLists.DAL.Models
{
    public class BlockMetadata : BaseEntity
    {
        public BlockMetadata()
        {
            FieldsMetadata = new List<FieldMetadata>();
        }

        public string Title { get; set; }
        public int Order { get; set; }
        public int RowSpan { get; set; }
        public int ColumnSpan { get; set; }

        public Guid EntityTemplateId { get; set; }
        public EntityTemplate EntityTemplate { get; set; }

        public List<FieldMetadata> FieldsMetadata { get; set; }
    }
}
