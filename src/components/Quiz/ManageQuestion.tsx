import React, { useState, useEffect } from "react";
import { addQuiz } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { UpdateQuestion } from "../../store/actions";
import { useHistory } from "react-router-dom";
import { uuid } from "../../utils";
import { Option, Question, Quiz, Store } from "../../store/types";
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
  const [optionType, setOptionType] = useState<"single" | "multiple">("single");
  const [error, setError] = useState<{
    text: boolean;
    points: boolean;
  }>({ text: false, points: false });
  const [openOption, setOpenOption] = useState<boolean>(false);

  useEffect(() => {
    const quiz = quizList.find((item: Quiz) => item.id === quizId);

    if (quiz) {
      const question = quiz.items.find(
        (item: Question) => item.id === questionId
      );

      if (question) {
        setText(question.text);
        setImageUrl(question.imageUrl!);
        setPoints(String(question.points));
        setOptionType(question.optionType);
      }
    }
  }, []);

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
  };

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
              <label className="label is-small">Quesiton points</label>
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
                <div className="select is-small">
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

          {openOption ? (
            <CreateOption
              questionId={questionId}
              quizId={quizId}
              closeOption={setOpenOption}
            />
          ) : (
            <div
              className="field is-grouped"
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
