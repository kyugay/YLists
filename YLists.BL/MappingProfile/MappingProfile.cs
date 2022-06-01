using AutoMapper;
using Microsoft.AspNetCore.Identity;
using YLists.BL.ViewModels;
using YLists.DAL.Models;

namespace YLists.BL.MappingProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Entity, EntityViewModel>()
                .ForMember(dest => dest.EntityFieldValues, opt => opt.Ignore())
                .AfterMap((src, dest) => {
                    dest.EntityTemplate?.BlocksMetadata?.ForEach(block =>
                        block.FieldsMetadata?.ForEach(field =>
                            field.FieldValue = src.EntityFieldValues?.FirstOrDefault(fv => fv.FieldMetadataId == field.Id)?.Value
                        )
                    );
                });

            CreateMap<EntityViewModel, Entity>()
                .ForMember(dest => dest.EntityTemplateId, opt => opt.MapFrom(src => src.EntityTemplate.Id))
                .ForMember(dest => dest.EntityTemplate, opt => opt.Ignore())
                .ForMember(dest => dest.Categories, opt => opt.Ignore())
                .AfterMap((src, dest, ctx) => {
                    dest.EntityFieldValues = src.EntityTemplate?.BlocksMetadata?
                        .SelectMany(block => block.FieldsMetadata)
                        .Select(field => new EntityFieldValue() { Value = field.FieldValue ?? "", FieldMetadataId = field.Id.Value, EntityId = dest.Id })
                        .ToList() ?? new List<EntityFieldValue>();

                    var srcCategories = ctx.Mapper.Map<Category[]>(src.Categories);

                    dest.Categories.AddRange(srcCategories.Where(sc => !dest.Categories.Any(dc => dc.Id == sc.Id)));

                    foreach (var categoryToDelete in dest.Categories.Where(dc => !srcCategories.Any(sc => sc.Id == dc.Id)).ToList())
                    {
                        dest.Categories.Remove(categoryToDelete);
                    }
                });

            CreateMap<EntityFieldValue, EntityFieldValueViewModel>()
                .ReverseMap();

            CreateMap<EntityTemplate, EntityTemplateViewModel>()
                .ReverseMap();

            CreateMap<BlockMetadata, BlockMetadataViewModel>()
                .ReverseMap();

            CreateMap<FieldMetadata, FieldMetadataViewModel>()
                .ForMember(dest => dest.FieldValue, opt => opt.Ignore())
                .ReverseMap();

            CreateMap<FieldOptionCollection, FieldOptionCollectionViewModel>()
                .ReverseMap();

            CreateMap<FieldOption, FieldOptionViewModel>()
                .ReverseMap();

            CreateMap<Category, CategoryViewModel>()
                .ForMember(dest => dest.Parent, opt => opt.Ignore());

            CreateMap<CategoryViewModel, Category>();

            CreateMap<Category, EntityCategoryViewModel>()
                .ReverseMap();

            CreateMap<IdentityUser<Guid>, IdentityUserViewModel>()
                .ReverseMap();

            CreateMap<Model, ModelViewModel>()
                .ReverseMap();
        }
    }
}
