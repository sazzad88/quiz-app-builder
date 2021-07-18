import React from "react";
import { Link } from "react-router-dom";

import { Quiz } from "../../store/types";
import ReactTooltip from "react-tooltip";

function QuizPage({ quiz }: { quiz: Quiz }) {
  return (
    <div className="card mt-20">
      <header className="card-header">
        <div className="card-header-title">
          {quiz.title}
          &nbsp;&nbsp;
          <span
            data-tip
            data-for={quiz.id}
            className={`tag is-${quiz.valid ? "success" : "danger"}`}
          >
            {quiz.valid ? "Valid" : "Not valid ?"}
          </span>
          <ReactTooltip id={quiz.id} place="top" effect="solid">
            Each quesiton in a quiz should have at least 2 options and 1 or more
            marked answers.
          </ReactTooltip>
        </div>
        <Link
          to={`/dashboard/quiz/${quiz.id}/edit`}
          className="button is-small is-link"
        >
          Edit
        </Link>
      </header>
    </div>
  );
}

export default QuizPage;
