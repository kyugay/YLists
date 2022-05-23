namespace YLists.DAL.Models
{
    public class FieldOption : BaseEntity
    {
        public FieldOption() { }

        public string Value { get; set; }

        public Guid FieldOptionCollectionId { get; set; }
        public FieldOptionCollection FieldOptionCollection { get; set; }
    }
}
