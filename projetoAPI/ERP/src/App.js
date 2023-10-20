import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={HomeScreen} />
        <Route path="/" component={Login} exact />
      </Switch>
    </Router>
  );
};

export default App;
