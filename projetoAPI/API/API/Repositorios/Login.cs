using API.Data;
using API.Models;
using API.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositorios
{
    public class Login : ILogin
    {
        private readonly SistemaTarefasDBcontex _dbContext;

        public Login(SistemaTarefasDBcontex sistemaTarefasDBcontex)
        {
            _dbContext = sistemaTarefasDBcontex;
        }

        public async Task<int> searchUserId(string nome)
        {
            var user = await _dbContext.Usuarios.FirstOrDefaultAsync(u => u.Name == nome);

            if (user != null)
            {
                return user.Id;
            }

            return -1; 
        }

        public async Task<bool> VerifyUser(string userName, string userEmail)
        {
            return await _dbContext.Usuarios
                .AnyAsync(u => u.Name == userName && u.Email == userEmail);
        }
    }
}
