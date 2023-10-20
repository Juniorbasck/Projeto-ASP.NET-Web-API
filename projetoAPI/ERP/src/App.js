import React, { useState } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import NotFound from "./../src/screens/NotFound"
import PrivateRoute from "./components/homeComponents/PrivateRoute";


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      
      setLoggedIn(true);
      
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute
            path="/home"
            component={home}    
            loggedIn={loggedIn}      
        />  
        <Route path="/notfound" component={NotFound} exact />
      </Switch>
    </Router>
  );
};

export default App;
