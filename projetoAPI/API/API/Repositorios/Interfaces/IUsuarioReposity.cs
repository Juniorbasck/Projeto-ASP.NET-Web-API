using API.Models;
using Microsoft.EntityFrameworkCore.Storage;

namespace API.Repositorios.Interfaces
{
    public interface IUsuarioReposity
    {
        Task<List<UsuarioModel>> SerchAllUser();
        
        Task<UsuarioModel> SerchUserById(int id);

        Task<UsuarioModel> AddUser(UsuarioModel usuario);

        Task<UsuarioModel> UpdateUser(UsuarioModel usuario, int id);

        Task<bool> RemoveUser(int id);
    }
}
