import React from "react";
import Header from "./../components/Header";
import AddTask from "../components/AddTask";


const HomeScreen = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <Header />
      <AddTask />
    </div>
  );
};

export default HomeScreen;
