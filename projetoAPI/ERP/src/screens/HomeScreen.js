import React, { useState } from "react";
import Header from "./../components/Header";
import AddTask from "../components/AddTask";
import Table from "../components/Table";
import { Redirect } from "react-router-dom";

const HomeScreen = () => {
  window.scrollTo(0, 0);
  const token = localStorage.getItem("token");
  

  if ( token == null) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header />
      <AddTask />
      <Table />
    </div>
  );
};

export default HomeScreen;
