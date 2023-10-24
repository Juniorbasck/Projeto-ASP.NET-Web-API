import React, { useState } from "react";
import axios from "axios";
import "./AddTask.css";

const StatusTarefas = {
    Afazer: 1,
    EmAndamento: 2,
    Concluido: 3,
  };
  
const AddTask = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(StatusTarefas.Afazer);
  const [valor, setValor] = useState(0);
  const [message, setMessage] = useState("");

  const id = 0;

  const token = localStorage.getItem("token");
  const usuarioId = localStorage.getItem("userId");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const handleTask = async (e) => {
        e.preventDefault();

    try{
       const response  = await axios.post("https://localhost:7111/api/Tarefa", {
            id: id, 
            name: name,
            description: description,
            status: status,
            valor: valor ,
            usuarioId: usuarioId,
        },
        config
        );

        if  (response === 200){
            setMessage("Task adicionado"); 
        }
    } catch (error) {
        if (error.response) {
          setMessage("Erro ao adicionar a tarefa");
        } else {
          console.error("Credenciais inválidas", error);
        }
      }
  };

  return (
    <div>
        <form onSubmit={handleTask}>
            <div style={{ display: 'flex', alignItems: 'center', padding: "15px", border: "solid gray 1px"}}>
                <div style={{ marginRight: '10px', marginLeft: "70px"}}>
                    <label style={{marginRight: "10px"}}>Nome da Tarefa:</label>
                    <input className="name-button dropdown-toggle" type="text"  placeholder="Nome da tarefa"  value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div style={{marginRight: "10px"}}>
                    <label style={{marginRight: "10px"}}>Descrição:</label>
                    <input className="name-button dropdown-toggle" type="text" placeholder="Descrição da tarefa" value={description} onChange={(e) => setDescription(e.target.value)}
                />
                </div>
                <div style={{marginRight: "10px"}}>
                    <label style={{marginRight: "10px"}}>Status:</label>
                    <select className="name-button dropdown-toggle" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value={StatusTarefas.Afazer}>A fazer</option>
                        <option value={StatusTarefas.EmAndamento}>Em andamento</option>
                        <option value={StatusTarefas.Concluido}>Concluído</option>
                    </select>
                </div>
                <div style={{marginRight: "10px"}}>
                    <label style={{marginRight: "10px"}}>Valor:</label>
                    <input className="name-button dropdown-toggle" type="number" placeholder="Valor da tareda" value={valor} onChange={(e) => setValor(e.target.value)}
                />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: "center", marginTop: "10px"}}>
                <button
                style={{
                    backgroundColor: '#5f0475',
                    color: '#fff',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.10s',
                    }}
                    onClick={handleTask}
                    >
                    Adicionar Tarefa
                    </button>
            </div>
            <div style={{ display: 'flex', justifyContent: "center", marginTop: "10px"}}> 
                {message && <p>{message}</p>}
            </div>
        </form>
    </div>
  );
};

export default AddTask;
