using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Entities.Indentity;
using Core.Entities.orderAggregate;

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


            CreateMap<Core.Entities.Indentity.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();

            CreateMap<AddressDto, Core.Entities.orderAggregate.Address>()
                        .ForMember(dest => dest.ZipCode, opt => opt.MapFrom(s => s.ZipCore));

            CreateMap<Order, OrderToReturnDto>()
                        .ForMember(d => d.DeliveryMethod, opt => opt.MapFrom(s => s.DeliveryMethod.ShortName))
                        .ForMember(d => d.ShippingPrice, opt => opt.MapFrom(s => s.DeliveryMethod.Price));


            CreateMap<OrderItem, OrderItemDto>()
                        .ForMember(d => d.ProductId, opt => opt.MapFrom(s => s.ItemOrderd.ProductItemId))
                        .ForMember(d => d.ProductName, opt => opt.MapFrom(s => s.ItemOrderd.Name))
                        .ForMember(d => d.PictureUrl, opt => opt.MapFrom(s => s.ItemOrderd.PictureUrl))
                        .ForMember(d => d.PictureUrl, opt => opt.MapFrom<OrderItemUrlResolver>());
        }
    }
}