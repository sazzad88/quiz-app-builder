import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Quiz, Question, ResultType } from "../../store/types";
import QuizOption from "./QuizOption";
import QuizResult from "./QuizResult";
function OnePageQuiz({ quiz }: { quiz: Quiz }) {
  const [show, setShow] = useState<boolean>(false);
  const [currentIndex, setcurrentIndex] = useState<number>(0);
  const [givenAnswerMap, setGivenAnswerMap] = useState<
    Record<string, string[]>
  >({});

  const [finalResult, setFinalResult] = useState<ResultType>({
    totalQuestion: 0,
    correctAnswers: 0,
    gainPoints: 0,
  });

  const updateAnswer = (questionId: string, answer: string[]) => {
    setGivenAnswerMap({ ...givenAnswerMap, [questionId]: answer });
  };

  const restart = () => {
    setFinalResult({
      totalQuestion: 0,
      correctAnswers: 0,
      gainPoints: 0,
    });

    setShow(false);
    setGivenAnswerMap({});
    setcurrentIndex(0);
  };

  const calculateResult = () => {
    let gainPoints = 0,
      correctAnswers = 0;
    quiz.items.forEach((item: Question) => {
      if (givenAnswerMap[item.id]) {
        if (item.correctAnswers.length === givenAnswerMap[item.id].length) {
          let all_ok = true;
          givenAnswerMap[item.id].forEach((answer: string) => {
            if (item.correctAnswers.indexOf(answer) === -1) all_ok = false;
          });

          if (all_ok) {
            gainPoints += item.points;
            correctAnswers = correctAnswers + 1;
          }
        }
      }
    });

    setFinalResult({
      totalQuestion: quiz.items.length,
      correctAnswers,
      gainPoints,
    });
    setShow(true);
  };

  const navigate = (type: string) => {
    if (type === "next") {
      if (currentIndex === quiz.items.length - 1) {
        calculateResult();
        return;
      } else {
        setcurrentIndex((currentValue) => currentValue + 1);
      }
    } else if (currentIndex > 0) {
      setcurrentIndex((currentValue) => currentValue - 1);
    }
  };

  return (
    <div>
      {/* <p>{JSON.stringify(finalResult)}</p> */}
      {show ? (
        <QuizResult result={finalResult} restart={restart} />
      ) : (
        <>
          <p style={{ textAlign: "right" }}>
            <span>
              {currentIndex + 1} / {quiz.items.length}
            </span>
          </p>
          {[quiz.items[currentIndex]].map((question: Question) => (
            <QuizOption
              givenAnswerMap={givenAnswerMap}
              updateAnswer={updateAnswer}
              key={question.id}
              question={question}
            />
          ))}

          <div
            className="field is-grouped"
            style={{ justifyContent: "center" }}
          >
            <div className="control">
              <button
                disabled={currentIndex === 0}
                className="button is-link is-small"
                onClick={() => navigate("prev")}
              >
                Prev
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link is-small"
                onClick={() => navigate("next")}
              >
                {currentIndex === quiz.items.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OnePageQuiz;
