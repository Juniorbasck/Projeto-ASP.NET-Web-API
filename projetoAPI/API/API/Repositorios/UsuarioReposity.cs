using API.Data;
using API.Models;
using API.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositorios
{
    public class UsuarioReposity : IUsuarioReposity
    {
        private readonly SistemaTarefasDBcontex _dbContext;

        public UsuarioReposity(SistemaTarefasDBcontex sistemaTarefasDBcontex)
        {
            _dbContext = sistemaTarefasDBcontex;
        }

        public async Task<UsuarioModel> AddUser(UsuarioModel usuario)
        {
            await _dbContext.Usuarios.AddAsync(usuario);
            await _dbContext.SaveChangesAsync();

            return usuario;
        }

        public async Task<bool> RemoveUser(int id)
        {
            UsuarioModel userForId = await SerchUserById(id);


            if (userForId == null)
            {
                throw new Exception("User not find in the API. id: {id}");
            }

            _dbContext.Usuarios.Remove(userForId);
            await _dbContext.SaveChangesAsync();

            return true; 

        }

        public async Task<List<UsuarioModel>> SerchAllUser()
        {
            return await _dbContext.Usuarios.ToListAsync();
        }

        public async Task<UsuarioModel> SerchUserById(int id)
        {
            return await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.Id == id);

        }

        public async Task<UsuarioModel> UpdateUser(UsuarioModel usuario, int id)
        {
            UsuarioModel userForId = await SerchUserById(id);
            
            if(userForId == null)
            {
                throw new Exception("User not find in the API. id: {id}");
            }

            userForId .Name = usuario.Name;
            userForId .Email = usuario.Email;
            
            _dbContext.Usuarios.Update(userForId);
            await _dbContext.SaveChangesAsync();

            return usuario;
        }

         async Task<bool> IUsuarioReposity.RemoveUser(int id)
        {
            UsuarioModel userForId = await SerchUserById(id);


            if (userForId == null)
            {
                throw new Exception("User not find in the API. id: {id}");
            }

            _dbContext.Usuarios.Remove(userForId);
            await _dbContext.SaveChangesAsync();

            return true;
        }
    
    }
}
