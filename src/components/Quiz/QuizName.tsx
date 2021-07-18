import React from "react";
import { Link } from "react-router-dom";

import { Quiz } from "../../store/types";

function QuizPage({ quiz }: { quiz: Quiz }) {
  return (
    <div className="card mt-20">
      <header className="card-header">
        <p className="card-header-title">{quiz.title}</p>
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
