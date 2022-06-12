using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using YLists.DAL.Models;

namespace YLists.DAL
{
    public class ApplicationContext : IdentityDbContext<IdentityUser<Guid>, IdentityRole<Guid>, Guid>
    {
        public DbSet<Entity> Entities { get; set; }
        public DbSet<EntityFieldValue> EntityFieldValues { get; set; }

        public DbSet<EntityTemplate> EntityTemplates { get; set; }
        public DbSet<BlockMetadata> BlocksMetadata { get; set; }
        public DbSet<FieldMetadata> FieldsMetadata { get; set; }

        public DbSet<FieldOptionCollection> FieldOptionCollection { get; set; }
        public DbSet<FieldOption> FieldOptions { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Model> Models { get; set; }

        public DbSet<SharedAccess> SharedAccesses { get; set; }

        public override DbSet<IdentityUser<Guid>> Users { get; set; }
        public override DbSet<IdentityUserClaim<Guid>> UserClaims { get; set; }
        public override DbSet<IdentityUserLogin<Guid>> UserLogins { get; set; }
        public override DbSet<IdentityUserToken<Guid>> UserTokens { get; set; }
        public override DbSet<IdentityUserRole<Guid>> UserRoles { get; set; }
        public override DbSet<IdentityRole<Guid>> Roles { get; set; }
        public override DbSet<IdentityRoleClaim<Guid>> RoleClaims { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
