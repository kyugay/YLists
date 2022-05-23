using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YLists.DAL.Models;

namespace YLists.DAL.Configurations
{
    public class FieldOptionCollectionConfiguration : IEntityTypeConfiguration<FieldOptionCollection>
    {
        public void Configure(EntityTypeBuilder<FieldOptionCollection> builder)
        {
            builder.HasKey(foc => foc.Id);

            builder
                .Property(foc => foc.Name)
                .HasMaxLength(128)
                .IsRequired();

            builder
                .HasOne(foc => foc.Owner)
                .WithMany()
                .HasForeignKey(foc => foc.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
