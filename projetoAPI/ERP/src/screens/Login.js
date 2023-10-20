import React, { useState, useEffect } from "react";
import Header from "./../components/Header";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Login = () => {
  window.scrollTo(0, 0);

  const [nome, setNomel] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7111/api/Login", {
        userName: nome,
        userEmail: email,
      });

      if (response.status === 200) {
        var token = localStorage.setItem("token", response.data.token);

        console.log(token)
        setMessage("Login realizado com sucesso");
        setLoggedIn(true);
      }
    } catch (error) {
      if (error.response) {
        setMessage("Credenciais inválidas");
      } else {
        console.error("Erro durante o login:", error);
      }
    }
  };

  useEffect(() => {
    if (loggedIn) {
      return <Redirect to="/home" />;
    }
  }, [loggedIn]);

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={handleLogin}>
          <input
            type="name"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default Login;
