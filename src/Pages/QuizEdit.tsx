import React from "react";
import Edit from "../components/Dashboard/Edit";
import { Link } from "react-router-dom";

function QuizEdit() {
  return (
    <div className="columns">
      <div className="column is-12">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Edit Quiz</p>
            <Link className="button is-small is-info" to="/dashboard">
              Back to quiz list
            </Link>
          </header>
          <div className="card-content">
            <div className="content">
              <Edit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizEdit;
