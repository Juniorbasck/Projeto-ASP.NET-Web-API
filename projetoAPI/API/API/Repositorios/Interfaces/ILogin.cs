using API.Models;

namespace API.Repositorios.Interfaces
{
    public interface ILogin
    {
        Task<int> searchUserId(string nome);
        Task<bool> VerifyUser(string userName, string userEmail);
    }
}
