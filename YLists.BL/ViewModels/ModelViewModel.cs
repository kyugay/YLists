namespace YLists.BL.ViewModels
{
    public class ModelViewModel
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Language { get; set; }
        public string Timestamp { get; set; }

        public Guid? EntityTemplateId { get; set; }
        public EntityTemplateViewModel? EntityTemplate { get; set; }
    }
}
