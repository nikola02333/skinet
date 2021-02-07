using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.orderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {

        private readonly IBasketRepository _basketRepository;
        private readonly IUnitOfWork _unitOfWork;
        public OrderService(IUnitOfWork unitOfWork, IBasketRepository basketRepository)
        {
            _unitOfWork = unitOfWork;
            _basketRepository = basketRepository;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            // get basket from the repo
            var basket = await _basketRepository.GetBasketAsync(basketId);
            //get items orm the product repo
            var items = new List<OrderItem>();

            foreach (var item in basket.Items)
            {
                var productItem = await _unitOfWork.Rerpository<Product>().GetByIdAsync(item.Id);


                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);

                items.Add(orderItem);
            }
            // get delivery method from repo
            var deliveryMethod = await _unitOfWork.Rerpository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
            // calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            // create order 
            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal);

            _unitOfWork.Rerpository<Order>().Add(order);

            // TODO: save to db
            var result = await _unitOfWork.Complete();

            if (result <= 0)
            {
                return null;
            }

            await _basketRepository.DeleteBaketAsync(basketId);
            // return the order
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Rerpository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsyns(int id, string buyerEmail)
        {
            var spec = new OrdersWithItmesAndOrderingSpecification(id, buyerEmail);

            return await _unitOfWork.Rerpository<Order>().GetEntitiyWithSpec(spec);

        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsyns(string buyerEmail)
        {
            var spec = new OrdersWithItmesAndOrderingSpecification(buyerEmail);

            return await _unitOfWork.Rerpository<Order>().ListAsync(spec);
        }
    }
}