import React, { useState } from "react";
import Header from "./../components/Header";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Login = () => {
  window.scrollTo(0, 0);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7111/api/Login", {
        name: nome, // Deve ser "name" em vez de "userName"
        email: email, // Deve ser "email" em vez de "userEmail"
      });

      if (response.status === 200) {
        var token = localStorage.setItem("token", response.data.token);
        console.log(token);
        setMessage(response.data.mensagem); // A mensagem está na propriedade "mensagem"
        setLoggedIn(true);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.mensagem); // A mensagem de erro também está na propriedade "mensagem"
      } else {
        console.error("Erro durante o login:", error);
      }
    }
  };

  if (loggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={handleLogin}>
          <input
            type="name"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default Login;
