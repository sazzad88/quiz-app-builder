import React from "react";

import { ResultType } from "../../store/types";

function Result({ result }: { result: ResultType }) {
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
    </div>
  );
}

export default Result;
