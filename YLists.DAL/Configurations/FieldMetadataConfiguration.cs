using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YLists.DAL.Enums;
using YLists.DAL.Models;

namespace YLists.DAL.Configurations
{
    public class FieldMetadataConfiguration : IEntityTypeConfiguration<FieldMetadata>
    {
        public void Configure(EntityTypeBuilder<FieldMetadata> builder)
        {
            builder.HasKey(fm => fm.Id);

            builder
                .Property(fm => fm.Type)
                .HasDefaultValue(FieldType.TextBox);

            builder
                .Property(fm => fm.Label)
                .HasMaxLength(128)
                .IsRequired(false);

            builder
                .HasOne(fm => fm.BlockMetadata)
                .WithMany(bm => bm.FieldsMetadata)
                .HasForeignKey(fm => fm.BlockMetadataId)
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(fm => fm.FieldOptionCollection)
                .WithMany(foc => foc.FieldsMetadata)
                .HasForeignKey(fm => fm.FieldOptionCollectionId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);
        }
    }
}
