using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YLists.DAL.Models;

namespace YLists.DAL.Configurations
{
    public class FieldOptionConfiguration : IEntityTypeConfiguration<FieldOption>
    {
        public void Configure(EntityTypeBuilder<FieldOption> builder)
        {
            builder.HasKey(fo => fo.Id);

            builder
                .Property(fo => fo.Value)
                .IsRequired();

            builder
                .HasOne(fo => fo.FieldOptionCollection)
                .WithMany(foc => foc.FieldOptions)
                .HasForeignKey(fo => fo.FieldOptionCollectionId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
