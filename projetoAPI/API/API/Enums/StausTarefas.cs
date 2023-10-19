using System.ComponentModel;

namespace API.Enums
{
    public enum StausTarefas
    {
        [Description("A fazer")]

        Afazer = 1,

        [Description("Em andamento")]

        EmAndamento = 2,

        [Description("Concluido")]

        Concluido = 3,
    }
}
