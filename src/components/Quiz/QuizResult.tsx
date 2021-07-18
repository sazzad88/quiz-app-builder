import React from "react";

import { ResultType } from "../../store/types";

function Result({
  result,
  restart,
}: {
  result: ResultType;
  restart: () => void;
}) {
  return (
    <div className="notification is-primary is-light">
      <p className="has-text-centered">
        <strong>Total Question</strong> : &nbsp;&nbsp;
        <span className="tag is-primary">{result.totalQuestion}</span>
      </p>
      <p className="has-text-centered">
        <strong>Correct Answers</strong> : &nbsp;&nbsp;
        <span className="tag is-primary">{result.correctAnswers}</span>
      </p>
      <p className="has-text-centered">
        <strong>Points Scored</strong> : &nbsp;&nbsp;
        <span className="tag is-primary">{result.gainPoints}</span>
      </p>

      <p className="mt-50 has-text-centered">
        <button className="button  is-link" onClick={restart}>
          Restart
        </button>
      </p>
    </div>
  );
}

export default Result;
