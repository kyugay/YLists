using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using YLists.DAL.Models;

namespace YLists.DAL.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(c => c.Id);

            builder
                .Property(c => c.Name)
                .HasMaxLength(256)
                .IsRequired();

            builder
                .Property(c => c.CreatedDate)
                .HasDefaultValueSql("GETDATE()");

            builder
                .Property(c => c.ParentId)
                .IsRequired(false);

            builder
                .HasOne(c => c.Parent)
                .WithMany(cp => cp.Children)
                .HasForeignKey(c => c.ParentId)
                .OnDelete(DeleteBehavior.ClientCascade)
                .IsRequired(false);

            builder
                .HasOne(c => c.Owner)
                .WithMany()
                .HasForeignKey(c => c.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            /*builder
                .HasMany(c => c.Entities)
                .WithMany(e => e.Categories)
                .UsingEntity<CategoryEntity>(
                    b => b
                        .HasOne(ce => ce.Entity)
                        .WithMany()
                        .HasForeignKey(ce => ce.EntityId)
                        .OnDelete(DeleteBehavior.ClientCascade),
                    b => b
                        .HasOne(ce => ce.Category)
                        .WithMany()
                        .HasForeignKey(ce => ce.CategoryId)
                        .OnDelete(DeleteBehavior.ClientCascade),
                    b =>
                    {
                        b.HasKey(ce => new { ce.CategoryId, ce.EntityId });
                        b.ToTable("CategoryEntity");
                    }
                );*/
        }
    }
}
