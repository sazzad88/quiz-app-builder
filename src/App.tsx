import React from "react";

import "./App.css";

import { Provider, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import QuizEdit from "./Pages/QuizEdit";
import Quiz from "./Pages/Quiz";
import config from "./app_config.json";
import store from "./store/store";

store.subscribe(() => {
  localStorage.setItem(config.storage_key, JSON.stringify(store.getState()));
});

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

              <Route exact path="/dashboard/quiz/:quizId/edit">
                <QuizEdit />
              </Route>

              <Route exact path="/quiz/:quizId">
                <Quiz />
              </Route>
            </Switch>
          </Router>
        </section>
      </div>
    </Provider>
  );
}

export default App;
