using API.Models;
using Microsoft.EntityFrameworkCore.Storage;

namespace API.Repositorios.Interfaces
{
    public interface ITarefaReposity
    {
        Task<List<TarefaModel>> SerchAllTaks();
        
        Task<TarefaModel> SerchTaskById(int id);

        Task<TarefaModel> AddTask(TarefaModel usuario);

        Task<TarefaModel> UpdateTask(TarefaModel usuario, int id);

        Task<bool> RemoveTask(int id);
    }
}
