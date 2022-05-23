using System.ComponentModel.DataAnnotations.Schema;

namespace YLists.DAL.Models
{
    public abstract class BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
    }
}
