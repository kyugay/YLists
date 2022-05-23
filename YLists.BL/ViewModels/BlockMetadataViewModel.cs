namespace YLists.BL.ViewModels
{
    public class BlockMetadataViewModel
    {
        public Guid? Id { get; set; }
        public string? Title { get; set; }
        public int Order { get; set; }
        public int RowSpan { get; set; }
        public int ColumnSpan { get; set; }

        public List<FieldMetadataViewModel> FieldsMetadata { get; set; }
    }
}
