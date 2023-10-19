using API.Enums;

namespace API.Models
{
    public class TarefaModel
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public StausTarefas Status { get; set; }

        public decimal Valor { get; set; }

        public int? UsuarioId { get; set; }

        public virtual UsuarioModel? Usuario { get; set; }
    }
}
