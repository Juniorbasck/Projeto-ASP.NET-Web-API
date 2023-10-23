import React, { useState } from "react";
import axios from "axios";

const AddTask = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("A fazer");
  const [valor, setValor] = useState(0); 
  const [message, setMessage] = useState(""); 

  const token = localStorage.getItem("token");

  const handleAddTask = () => {
    const newTask = {
      name,
      description,
      status,
      valor,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("https://localhost:7111/api/Tarefa", newTask, config)
      .then((response) => {
        setMessage("Tarefa adicionada com sucesso");
      })
      .catch((error) => {
        if (error.response) {
          setMessage("Erro ao adicionar tarefa. Verifique os dados.");
        } else {
          setMessage("Erro durante a solicitação.");
        }
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nome da tarefa"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Descrição da tarefa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="A fazer">A fazer</option>
        <option value="Em andamento">Em andamento</option>
        <option value="Concluído">Concluído</option>
      </select>
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />
      <button onClick={handleAddTask}>Adicionar Tarefa</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddTask;
