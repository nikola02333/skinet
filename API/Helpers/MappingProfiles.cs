using API.DTOs;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDTO>()
                            .ForMember(dest => dest.ProductBrand, opt => opt.MapFrom(s => s.ProductBrand.Name))
                            .ForMember(dest => dest.ProductType, opt => opt.MapFrom(s => s.ProductType.Name))
                            .ForMember(dest => dest.PictureUrl, opt => opt.MapFrom<ProductUrlResolver>());


        }
    }
}