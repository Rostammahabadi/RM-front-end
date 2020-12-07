import React, { useContext, useEffect, useState } from "react";
import Login from "./screens/login";
import { AuthContext, AuthProvider } from "./context";
import Dashboard from "./screens/dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import NewContractor from "./screens/newContractor";
import Contractor from "./screens/contractor";
function App() {
  const { isLoggedIn, token, setIsLoggedIn, setToken } = useContext(
    AuthContext
  );

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setToken(token);
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/dashboard">
          <Link to="/contractor/add">Add Contractor</Link>
          {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/contractor/add">
          <NewContractor />
        </Route>
        <Route path={`/contractors/:contractorId`}>
          <Contractor />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
