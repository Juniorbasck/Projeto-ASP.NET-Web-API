using API.Models;

namespace API.Repositorios.Interfaces
{
    public interface ILogin
    {
        Task<bool> VerifyUser(string userName, string userEmail);
    }
}
