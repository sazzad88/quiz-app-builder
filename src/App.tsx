import React from "react";

import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
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
          </Switch>
        </Router>
      </section>
    </div>
  );
}

export default App;
