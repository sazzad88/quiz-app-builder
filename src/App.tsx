import React from "react";

import "./App.css";

import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import QuizEdit from "./Pages/QuizEdit";
import Quiz from "./Pages/Quiz";
import config from "./app_config.json";
import store from "./store/store";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "react-confirm-alert/src/react-confirm-alert.css";

store.subscribe(() => {
  localStorage.setItem(config.storage_key, JSON.stringify(store.getState()));
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ReactNotification />

        <section className="container cards-container">
          <Router>
            <nav className="navbar has-shadow">
              <div className="container">
                <div className="navbar-brand">
                  <Link className="navbar-item" to="/">
                    Quiz App Builder
                  </Link>
                </div>
              </div>
            </nav>
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
