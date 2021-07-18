import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Quiz, Question, ResultType } from "../../store/types";
import QuizOption from "./QuizOption";
import QuizResult from "./QuizResult";
function OnePageQuiz({ quiz }: { quiz: Quiz }) {
  const [show, setShow] = useState<boolean>(false);
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

  const restart = () => {
    setFinalResult({
      totalQuestion: 0,
      correctAnswers: 0,
      gainPoints: 0,
    });

    setShow(false);
    setGivenAnswerMap({});
  };

  return (
    <div>
      {/* <p>{JSON.stringify(finalResult)}</p> */}
      {show ? (
        <QuizResult result={finalResult} restart={restart} />
      ) : (
        <>
          {quiz.items.map((question: Question) => (
            <QuizOption
              updateAnswer={updateAnswer}
              key={question.id}
              question={question}
            />
          ))}

          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-link is-small"
                onClick={calculateResult}
              >
                Submit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OnePageQuiz;
