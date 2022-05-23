using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YLists.DAL.Models;

namespace YLists.DAL.Configurations
{
    public class EntityConfiguration : IEntityTypeConfiguration<Entity>
    {
        public void Configure(EntityTypeBuilder<Entity> builder)
        {
            builder.HasKey(e => e.Id);

            builder
                .Property(e => e.Name)
                .HasMaxLength(256)
                .IsRequired();

            builder
                .Property(e => e.CreatedDate)
                .HasDefaultValueSql("GETDATE()");

            builder
                .HasOne(e => e.EntityTemplate)
                .WithMany(et => et.Entities)
                .HasForeignKey(e => e.EntityTemplateId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(e => e.Owner)
                .WithMany()
                .HasForeignKey(e => e.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
