using API.DTOs;
using AutoMapper;
using Core.Entities.orderAggregate;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration _config;
        public OrderItemUrlResolver(IConfiguration config)
        {
            _config = config;

        }
        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ItemOrderd.PictureUrl))
            {
                return _config["ApiUrl"] + source.ItemOrderd.PictureUrl;
            }
            return null;
        }
    }
}