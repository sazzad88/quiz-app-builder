import React, { useState } from "react";
import { addQuestion } from "../../store/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { uuid } from "../../utils";

const CreateQuiz = ({
  quizId,
  closeQuestion,
}: {
  quizId: string;
  closeQuestion: (created: boolean) => void;
}) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [text, setText] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [points, setPoints] = useState<string>("1");
  const [error, setError] = useState<{
    text: boolean;
    points: boolean;
  }>({ text: false, points: false });

  const handleQuizQuestionCreate = () => {
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

    dispatch(addQuestion(quizId, text, imageUrl, +points));
    setTimeout(() => {
      closeQuestion(true);
    }, 500);
  };

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Quiz Question</p>
      </header>
      <div className="card-content">
        <div className="content">
          <div className="field">
            <label className="label">Quesiton text</label>
            <div className="control">
              <input
                className={`input ${error.text ? "is-danger" : ""}`}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setError({ ...error, text: false });
                }}
                type="text"
                placeholder="question text"
              />
            </div>
            {error.text ? (
              <p className="help is-danger">Question text is required.</p>
            ) : null}
          </div>
          <div className="field">
            <label className="label">Question Image (optional)</label>
            <div className="control">
              <input
                className={`input`}
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
                type="text"
                placeholder="question text"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Quesiton points</label>
            <div className="control">
              <input
                className={`input ${error.text ? "is-danger" : ""}`}
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
        </div>
      </div>
      <footer className="card-footer" style={{ padding: "20px" }}>
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-link is-small"
              onClick={handleQuizQuestionCreate}
            >
              Add
            </button>
          </div>
          <div className="control">
            <button
              className="button is-small"
              onClick={() => closeQuestion(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateQuiz;
