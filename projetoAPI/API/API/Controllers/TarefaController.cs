using API.Models;
using API.Repositorios;
using API.Repositorios.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{   
    //api/{nomeDaController
    [Route("api/[controller]")]
    [ApiController]
    public class TarefaController : ControllerBase
    {
        private readonly ITarefaReposity _tarefaReposity;

        public TarefaController(ITarefaReposity tarefaReposity) 
        {
            _tarefaReposity = tarefaReposity;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<TarefaModel>>> GetAllTasks()
        {   
            List<TarefaModel> tarefa = await _tarefaReposity.SerchAllTaks();
            
            return Ok(tarefa);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<List<TarefaModel>>> SerchTaskById(int id)
        {

           TarefaModel tarefa = await _tarefaReposity.SerchTaskById(id);

            return Ok(tarefa);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<TarefaModel>> AddTask([FromBody] TarefaModel tarefaModel)
        {
            TarefaModel tarefa = await _tarefaReposity.AddTask(tarefaModel);

            return Ok(tarefa);
        }

        [HttpPost("{id}")]
        [Authorize]
        public async Task<ActionResult<TarefaModel>> UpdateTask([FromBody] TarefaModel tarefaModel, int id)
        {

            tarefaModel.Id = id;

            TarefaModel tarefa = await _tarefaReposity.UpdateTask(tarefaModel, id);

;            return Ok(tarefa);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<TarefaModel>> RemoveTask(int id)
        {

            bool delete = await _tarefaReposity.RemoveTask(id);

            return Ok(delete);
        }
    }
}
 