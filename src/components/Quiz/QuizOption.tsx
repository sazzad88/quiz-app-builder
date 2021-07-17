import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Option, Question, Quiz, Store } from "../../store/types";
function QuizOption({
  givenAnswerMap,
  question,
  updateAnswer,
}: {
  givenAnswerMap?: Record<string, string[]>;
  question: Question;
  updateAnswer: (questionId: string, answer: string[]) => void;
}) {
  const [radioValue, setRadioValue] = useState<string>(
    givenAnswerMap
      ? givenAnswerMap[question.id]
        ? givenAnswerMap[question.id][0]
        : ""
      : ""
  );
  const [checkBoxValues, setCheckboxValues] = useState<string[]>(
    givenAnswerMap
      ? givenAnswerMap[question.id]
        ? givenAnswerMap[question.id]
        : []
      : []
  );
  return (
    <div className="columns">
      <div className="column is-full">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              {question.text}
              &nbsp;&nbsp;
              <span className="tag is-warning">{question.points}</span>
            </p>
          </header>
          <div className="card-content">
            {question.optionType === "multiple" ? (
              <div className="columns is-multiline">
                {question.options.map((option: Option) => (
                  <div key={option.id} className="column is-6">
                    <input
                      name={option.id}
                      value={option.id}
                      type="checkbox"
                      onChange={(e) => {
                        let newValue: string[] = [];
                        if (!e.target.checked) {
                          newValue = checkBoxValues.filter(
                            (item) => item !== option.id
                          );
                          setCheckboxValues(newValue);
                        } else {
                          newValue = [...checkBoxValues, option.id];
                          setCheckboxValues(newValue);
                        }

                        updateAnswer(question.id, newValue);
                      }}
                    />
                    &nbsp;&nbsp; {option.text}
                  </div>
                ))}
              </div>
            ) : (
              <div className="columns is-multiline">
                {question.options.map((option: Option) => (
                  <div key={option.id} className="column is-6">
                    <input
                      name={option.id}
                      value={option.id}
                      type="radio"
                      checked={radioValue === option.id}
                      onChange={(e) => {}}
                      onClick={() => {
                        setRadioValue(option.id);
                        updateAnswer(question.id, [option.id]);
                      }}
                    />
                    &nbsp;&nbsp; {option.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizOption;
