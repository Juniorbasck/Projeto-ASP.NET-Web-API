import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";

const Table = () => {
  const [tasks, setTasks] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {

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
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>R${task.valor}</td>
                  <td>
                    <button className="botao-excluir" onClick={() => handleDeleteTask(task.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5 className="total">Total: R${totalValue.toFixed(2)}</h5>
        </div>
      )}
    </div>
  );
};

export default Table;
