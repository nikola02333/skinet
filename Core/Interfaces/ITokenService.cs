using Core.Entities.Indentity;

namespace Core.Interfaces
{
    public interface ITokenService
    {
        string CreateTokent(AppUser user);
    }
}