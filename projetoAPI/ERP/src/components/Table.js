import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";

const StatusTarefas = {
    Pagar: 1,
    Pagando: 2,
    Pago: 3,
};

function getStatusName(status) {
    switch (status) {
      case StatusTarefas.Pagar:
        return "Pagar";
      case StatusTarefas.Pagando:
        return "Pagando";
      case StatusTarefas.Pago:
        return "Pago";
      default:
        return "Desconhecido";
    }
  }

  
const Table = () => {
  const [tasks, setTasks] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [editingTask, setEditingTask] = useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  
  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://localhost:7111/api/Tarefa", {
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
      });

      console.log(token)
      console.log(userId)
      if (response.status === 200) {

        const userTasks = response.data.filter((task) => task.usuarioId == userId);
        setTasks(userTasks);
        console.log("passou aqui")
        
        const total = userTasks.reduce((acc, task) => acc + task.valor, 0);
        setTotalValue(total);
      }
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); 
  }, [token, userId]); 

  console.log(tasks);

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`https://localhost:7111/api/Tarefa/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        
        setTasks(tasks.filter((task) => task.id !== taskId));
      }
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

    const handleEditTask = (task) => {
        setEditingTask(task); 
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

  const handleSaveEdit = async () => {
    try {

        const updatedTask = {
            id: editingTask.id, 
            name: editingTask.name,
            description: editingTask.description,
            status: parseInt(editingTask.status),
            valor: parseInt(editingTask.valor), 
            usuarioId: parseInt(userId)
          };

          console.log(token)
          const response = await axios.post(`https://localhost:7111/api/Tarefa/${updatedTask.id}`, updatedTask, {
                headers: {
                     Authorization: `Bearer ${token}`,
                },
            });
            
            if (response.status === 200) {

                fetchTasks(); 
                
                setEditingTask(null); 
            }
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  };

  return (
    <div className="PrinpalContainer">
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Valor</th>
                <th>Excluir</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{getStatusName(task.status)}</td>
                  <td>R${task.valor}</td>
                  <td>
                    <button className="botao-excluir" onClick={() => handleDeleteTask(task.id)}>
                      Excluir
                    </button>
                  </td>
                  <td>
                  <button className="botao-edidtar" onClick={() => handleEditTask(task)}>
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editingTask && (
            <div className="container-editar">
              <h4 className="titulo">Editar Tarefa</h4>
              <div>
                <label>Nome</label>
                <input
                    className="inputs"
                    type="text"
                    value={editingTask.name}
                    onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                />
                <label>Descrição</label>
                <input
                    className="inputs"
                    type="text"
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                />
                <label>Status</label>
                <select
                        className="name-button dropdown-toggle inputs"  
                        value={editingTask.status} 
                        onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })} >
                        <option value={StatusTarefas.Afazer}>A fazer</option>
                        <option value={StatusTarefas.EmAndamento}>Em andamento</option>
                        <option value={StatusTarefas.Concluido}>Concluído</option>
                </select>
                <label>Valor</label>
                <input
                    className="inputs"
                    type="number"
                    value={editingTask.valor}
                    onChange={(e) => setEditingTask({ ...editingTask, valor: e.target.value })}
                />
              </div>
              <button className="btnSalvar" onClick={handleSaveEdit}>Salvar</button>
              <button className="btCancelar" onClick={handleCancelEdit}>Cancelar</button>
            </div>
          )}        
          <h5 className="total">Total: R${totalValue.toFixed(2)}</h5>
        </div>
      )}
    </div>
  );
};

export default Table;
