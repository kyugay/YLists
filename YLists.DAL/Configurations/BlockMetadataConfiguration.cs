using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YLists.DAL.Models;

namespace YLists.DAL.Configurations
{
    public class BlockMetadataConfiguration : IEntityTypeConfiguration<BlockMetadata>
    {
        public void Configure(EntityTypeBuilder<BlockMetadata> builder)
        {
            builder.HasKey(bm => bm.Id);

            builder
                .Property(bm => bm.Title)
                .HasMaxLength(128)
                .IsRequired(false);

            builder
                .HasOne(bm => bm.EntityTemplate)
                .WithMany(et => et.BlocksMetadata)
                .HasForeignKey(bm => bm.EntityTemplateId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
