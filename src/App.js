import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_USER } from "./graphql/user";
import { AuthContext } from "./context/auth";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
    const { loadUser } = useContext(AuthContext);

    const { data } = useQuery(GET_USER);
    useEffect(() => {
        loadUser(data?.me);
    }, [data]);
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
