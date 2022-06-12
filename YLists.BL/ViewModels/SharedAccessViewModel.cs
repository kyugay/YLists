using YLists.DAL.Enums;

namespace YLists.BL.ViewModels
{
    public class SharedAccessViewModel
    {
        public Guid? Id { get; set; }
        public SharedAccessType Type { get; set; }
        public Guid? TemplateId { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? EntityId { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
