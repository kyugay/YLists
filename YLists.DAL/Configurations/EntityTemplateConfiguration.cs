using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YLists.DAL.Models;

namespace YLists.DAL.Configurations
{
    public class EntityTemplateConfiguration : IEntityTypeConfiguration<EntityTemplate>
    {
        public void Configure(EntityTypeBuilder<EntityTemplate> builder)
        {
            builder.HasKey(et => et.Id);

            builder
                .Property(et => et.Name)
                .IsRequired();

            builder
                .Property(et => et.Columns)
                .HasDefaultValue(3);

            builder
                .HasOne(et => et.Owner)
                .WithMany()
                .HasForeignKey(et => et.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
