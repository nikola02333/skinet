using System;
using System.Linq.Expressions;
using Core.Entities.orderAggregate;

namespace Core.Specifications
{
    public class OrdersWithItmesAndOrderingSpecification : BaseSpecification<Order>
    {
        public OrdersWithItmesAndOrderingSpecification(string email) : base(o => o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            AddOrderByDescending(o => o.OrderDate);
        }

        public OrdersWithItmesAndOrderingSpecification(int id, string email)
                                                : base(o => o.Id == id && o.BuyerEmail == email)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }
    }
}