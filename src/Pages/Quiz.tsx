import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Option, Question, Quiz, Store } from "../store/types";
function Home() {
  const params = useParams();
  const { quizId } = params as {
    quizId: string;
  };
  const quizList = useSelector((state: Store) => state.quizList);

  const [valid, setValid] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);

  useEffect(() => {
    const found = quizList.find((item: Quiz) => item.id === quizId);

    if (found) {
      setQuiz(found);
      setValid(true);
    }
  }, []);

  return (
    <div className="quizContainer">
      <div className="holder">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              {quiz ? quiz.title : "not found"}
            </p>
          </header>
          <div className="card-content">
            <div className="content">
              {quiz ? (
                <>
                  {!quizStarted ? (
                    <>
                      <p>{quiz.items.length} questions.</p>
                      <p className="has-text-centered mt-20">
                        <button
                          className="button is-primary"
                          onClick={() => {
                            setQuizStarted(true);
                          }}
                        >
                          Start the quiz
                        </button>
                      </p>
                    </>
                  ) : (
                    <p>Start the quizz</p>
                  )}
                </>
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;