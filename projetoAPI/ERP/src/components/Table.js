import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";

const Table = () => {
  const [tasks, setTasks] = useState([]);
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

          const userTasks = response.data;
          setTasks(userTasks);
          console.log("passou aqui")
          
        }
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };
    fetchTasks(); // Chama a função quando o componente é montado
  }, [token, userId]); // Executa sempre que token ou userId mudam

  console.log(tasks);

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`https://localhost:7111/api/Tarefa/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Atualize a lista de tarefas após a exclusão
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
                <td>{task.valor}</td>
                <td>
                  <button onClick={() => handleDeleteTask(task.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}  

export default Table;
