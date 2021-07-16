import React from "react";

import "./App.css";

import { Provider, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";

import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <nav className="navbar has-shadow">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="#">
                Quiz App Builder
              </a>
            </div>
          </div>
        </nav>

        <section className="container cards-container">
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
            </Switch>
          </Router>
        </section>
      </div>
    </Provider>
  );
}

export default App;
