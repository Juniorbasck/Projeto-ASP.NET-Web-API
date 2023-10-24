import React from "react";
import Header from "./../components/Header";
import AddTask from "../components/AddTask";
import Table from "../components/Table";


const HomeScreen = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      <AddTask />
      <Table />
    </div>
  );
};

export default HomeScreen;
