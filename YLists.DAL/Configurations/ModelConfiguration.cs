using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YLists.DAL.Models;

namespace YLists.DAL.Configurations
{
    public class ModelConfiguration : IEntityTypeConfiguration<Model>
    {
        public void Configure(EntityTypeBuilder<Model> builder)
        {
            builder.HasKey(m => m.Id);

            builder
                .Property(m => m.Name)
                .HasMaxLength(128)
                .IsRequired();

            builder
                .Property(m => m.Language)
                .HasMaxLength(32)
                .IsRequired();

            builder
                .Property(m => m.Timestamp)
                .HasMaxLength(64)
                .IsRequired();

            builder
                .HasOne(m => m.EntityTemplate)
                .WithMany(et => et.Models)
                .HasForeignKey(m => m.EntityTemplateId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(foc => foc.Owner)
                .WithMany()
                .HasForeignKey(foc => foc.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
