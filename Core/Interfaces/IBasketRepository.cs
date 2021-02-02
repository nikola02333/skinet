using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
        Task<CustomerBasket> GetBasketAsync(string basketId);

        Task<CustomerBasket> UpdateBaketAsync(CustomerBasket basket);

        Task<bool> DeleteBaketAsync(string basketId);
    }
}