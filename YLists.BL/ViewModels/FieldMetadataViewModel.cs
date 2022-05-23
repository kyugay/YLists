using YLists.DAL.Enums;

namespace YLists.BL.ViewModels
{
    public class FieldMetadataViewModel
    {
        public Guid? Id { get; set; }
        public FieldType Type { get; set; }
        public string? Label { get; set; }
        public int Order { get; set; }

        public Guid? FieldOptionCollectionId { get; set; }
        public FieldOptionCollectionViewModel? FieldOptionCollection { get; set; }

        public string? FieldValue { get; set; }
    }
}
