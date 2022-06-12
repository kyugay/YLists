using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YLists.DAL.Models;

namespace YLists.DAL.Configurations
{
    public class SharedAccessConfiguration : IEntityTypeConfiguration<SharedAccess>
    {
        public void Configure(EntityTypeBuilder<SharedAccess> builder)
        {
            builder.HasKey(e => e.Id);

            builder
                .Property(e => e.CreatedDate)
                .HasDefaultValueSql("GETDATE()");
        }
    }
}
