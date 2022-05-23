﻿using Microsoft.EntityFrameworkCore;
using YLists.BL.Contracts;
using YLists.BL.Services;
using YLists.DAL;

namespace YLists.Web
{
    public static class StartupExtensions
    {
        public static void ConnectAppServices(this IServiceCollection services)
        {
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IBlockMetadataDataService, BlockMetadataDataService>();
            services.AddScoped<ICategoryDataService, CategoryDataService>();
            services.AddScoped<IEntityDataService, EntityDataService>();
            services.AddScoped<IEntityFieldValueDataService, EntityFieldValueDataService>();
            services.AddScoped<IEntityTemplateDataService, EntityTemplateDataService>();
            services.AddScoped<IFieldMetadataDataService, FieldMetadataDataService>();
            services.AddScoped<IFieldOptionCollectionDataService, FieldOptionCollectionDataService>();
            services.AddScoped<IFieldOptionDataService, FieldOptionDataService>();
        }

        public static void UpdateDatabase(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
            using var context = serviceScope.ServiceProvider.GetService<ApplicationContext>();

            context?.Database.Migrate();
        }
    }
}