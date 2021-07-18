import React, { useState, useEffect } from "react";
import { UpdateOption, DeleteOption } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { UpdateQuestion } from "../../store/actions";
import { useHistory } from "react-router-dom";
import { uuid } from "../../utils";
import { Option, Question, Quiz, Store } from "../../store/types";
import QuestionOption from "./QuestionOption";
import CreateOption from "./CreateOption";

const ManageQuestion = ({
  questionId,
  quizId,
  closeModal,
}: {
  questionId: string;
  quizId: string;
  closeModal: () => void;
}) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const quizList = useSelector((state: Store) => state.quizList);
  const [text, setText] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [points, setPoints] = useState<string>("1");
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [optionType, setOptionType] = useState<"single" | "multiple">("single");
  const [error, setError] = useState<{
    text: boolean;
    points: boolean;
  }>({ text: false, points: false });
  const [openOption, setOpenOption] = useState<boolean>(false);
  const [options, setOptions] = useState<Option[]>([]);

  const setEverything = () => {
    const quiz = quizList.find((item: Quiz) => item.id === quizId);

    if (quiz) {
      const question = quiz.items.find(
        (item: Question) => item.id === questionId
      );

      console.log("called with q ", question?.options);

      if (question) {
        setText(question.text);
        setImageUrl(question.imageUrl!);
        setPoints(String(question.points));
        setOptionType(question.optionType);
        setCorrectAnswers(question.correctAnswers);
        setOptions([...question.options]);
      }
    }
  };

  useEffect(() => {
    setEverything();
  }, [openOption]);

  const handleQuizQuestionUpdate = () => {
    if (text.trim().length < 1) {
      setError({ ...error, text: true });
      return;
    }

    if (points.trim() === "") {
      setError({ ...error, points: true });
      return;
    } else {
      //   console.log(+points);
      if (isNaN(+points)) {
        setError({ ...error, points: true });
        return;
      } else {
        if (+points <= 0) {
          setError({ ...error, points: true });
          return;
        }
      }
    }

    dispatch(
      UpdateQuestion(quizId, questionId, text, imageUrl, +points, optionType)
    );

    setTimeout(() => {
      setEverything();
    }, 400);
  };

  const handleUpdateOption = (
    optionId: string,
    text: string,
    imageUrl: string,
    answer: string
  ) => {
    dispatch(
      UpdateOption(optionId, quizId, questionId, text, imageUrl, answer)
    );

    setTimeout(() => {
      setEverything();
    }, 400);
  };

  const handleOptionDelete = (opitonId: string) => {
    dispatch(DeleteOption(questionId, quizId, opitonId));

    setTimeout(() => {
      setEverything();
    }, 400);
  };

  console.log(options);

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card big-modal">
        <header className="modal-card-head">
          <p className="modal-card-title">Manage Question</p>
          <button
            className="delete"
            onClick={closeModal}
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Question</label>
              <div className="control">
                <input
                  className={`input is-small ${error.text ? "is-danger" : ""}`}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    setError({ ...error, text: false });
                  }}
                  type="text"
                  placeholder="title"
                />
              </div>
              {error.text ? (
                <p className="help is-danger">Question text is required.</p>
              ) : null}
            </div>
            <div className="field">
              <label className="label is-small">
                Question Image (optional)
              </label>
              <div className="control">
                <input
                  className={`input is-small`}
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
                  type="text"
                  placeholder="question text"
                />
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Question points</label>
              <div className="control">
                <input
                  className={`input is-small ${error.text ? "is-danger" : ""}`}
                  value={points}
                  onChange={(e) => {
                    setPoints(e.target.value);
                    setError({ ...error, points: false });
                  }}
                  min="0"
                  type="text"
                  placeholder="question points"
                />
              </div>
              {error.points ? (
                <p className="help is-danger">
                  Question points is required and must be greater than 0
                </p>
              ) : null}
            </div>
            <div className="field">
              <label className="label is-small">Selection Type</label>
              <div className="control">
                <div className="select is-small is-fullwidth">
                  <select
                    value={optionType}
                    onChange={(e) => {
                      setOptionType(e.target.value as "single" | "multiple");
                    }}
                  >
                    <option value="single">Single Selection</option>
                    <option value="multiple">Multi Selection</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {options.length === 0 ? null : (
            <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth mt-20 is-small">
              <thead>
                <tr>
                  <th>
                    <abbr title="Text">Text</abbr>
                  </th>
                  <th>
                    <abbr title="imageUrl">imageUrl</abbr>
                  </th>
                  <th className="has-text-centered">
                    <abbr title="Answer">Answer</abbr>
                  </th>

                  <th className="has-text-centered"></th>
                </tr>
              </thead>
              <tbody>
                {options.map((option: Option) => (
                  <QuestionOption
                    correctAnswers={correctAnswers}
                    key={option.id}
                    option={option}
                    updateOption={handleUpdateOption}
                    handleOptionDelete={handleOptionDelete}
                  />
                ))}
              </tbody>
            </table>
          )}

          {openOption ? (
            <CreateOption
              questionId={questionId}
              quizId={quizId}
              closeOption={setOpenOption}
            />
          ) : (
            <div
              className="field is-grouped mt-20"
              style={{ justifyContent: "flex-end" }}
            >
              <div className="control">
                <button
                  className="button is-link is-small"
                  onClick={() => setOpenOption(true)}
                >
                  Add Option
                </button>
              </div>
            </div>
          )}
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            onClick={handleQuizQuestionUpdate}
          >
            Save General info
          </button>
          <button className="button" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ManageQuestion;
