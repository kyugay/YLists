using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YLists.DAL.Models;

namespace YLists.DAL.Configurations
{
    public class EntityFieldValueConfiguration : IEntityTypeConfiguration<EntityFieldValue>
    {
        public void Configure(EntityTypeBuilder<EntityFieldValue> builder)
        {
            builder.HasKey(fv => fv.Id);

            builder
                .Property(fv => fv.Value)
                .IsRequired();

            builder
                .HasOne(fv => fv.FieldMetadata)
                .WithMany(fm => fm.EntityFieldValues)
                .HasForeignKey(fv => fv.FieldMetadataId)
                .OnDelete(DeleteBehavior.ClientCascade);

            builder
                .HasOne(fv => fv.Entity)
                .WithMany(e => e.EntityFieldValues)
                .HasForeignKey(fv => fv.EntityId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
