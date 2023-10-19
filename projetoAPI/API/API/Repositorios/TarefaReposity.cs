using API.Data;
using API.Models;
using API.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repositorios
{
    public class TarefaReposity : ITarefaReposity
    {
        private readonly SistemaTarefasDBcontex _dbContext;

        public TarefaReposity(SistemaTarefasDBcontex sistemaTarefasDBcontex)
        {
            _dbContext = sistemaTarefasDBcontex;
        }

        public async Task<TarefaModel> AddTask(TarefaModel tarefa)
        {
            await _dbContext.Tarefas.AddAsync(tarefa);
            await _dbContext.SaveChangesAsync();

            return tarefa;
        }

        public async Task<bool> RemoveTask(int id)
        {
            TarefaModel tarefaForId = await SerchTaskById(id);


            if (tarefaForId == null)
            {
                throw new Exception("Task not find in the API. whith id: {id}");
            }

            _dbContext.Tarefas.Remove(tarefaForId);
            await _dbContext.SaveChangesAsync();

            return true; 

        }

        public async Task<List<TarefaModel>> SerchAllTaks()
        {
            return await _dbContext.Tarefas
                .Include(x => x.Usuario)
                .ToListAsync();
        }

        public async Task<TarefaModel> SerchTaskById(int id)
        {
            return await _dbContext.Tarefas
                .Include(x => x.Usuario)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<TarefaModel> UpdateTask(TarefaModel tarefa, int id)
        {
            TarefaModel tarefaPorId = await SerchTaskById(id);
            
            if(tarefaPorId == null)
            {
                throw new Exception("User not find in the API. id: {id}");
            }

            tarefaPorId.Name = tarefa.Name;
            tarefaPorId.Description = tarefa.Description;
            tarefaPorId.Status = tarefa.Status;
            tarefaPorId.Valor = tarefa.Valor;
            tarefaPorId.UsuarioId = tarefa.UsuarioId;

            _dbContext.Tarefas.Update(tarefaPorId);
            await _dbContext.SaveChangesAsync();

            return tarefaPorId;
        }

        public Task<TarefaModel> UpdateTask(UsuarioModel usuario, int id)
        {
            throw new NotImplementedException();
        }
    }
}
