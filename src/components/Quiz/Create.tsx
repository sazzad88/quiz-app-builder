import React, { useState } from "react";
import { addQuiz } from "../../store/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { uuid } from "../../utils";

const CreateQuiz = ({ closeModal }: { closeModal: () => void }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleQuizCreate = () => {
    if (title.trim().length <= 2) {
      setError(true);
      return;
    }
    let quizId = uuid();
    dispatch(addQuiz(title, quizId));
    setTimeout(() => {
      history.push(`/dashboard/quiz/${quizId}/edit`);
    });
    closeModal();
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create New Quiz</p>
          <button
            className="delete"
            onClick={closeModal}
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label is-small">Quiz Title</label>
            <div className="control">
              <input
                className={`input is-small ${error ? "is-danger" : ""}`}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError(false);
                }}
                type="text"
                placeholder="title"
              />
            </div>
            {error ? (
              <p className="help is-danger">
                Quiz title is required. it must be at least 3 characters long
              </p>
            ) : null}
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={handleQuizCreate}>
            Add
          </button>
          <button className="button" onClick={closeModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreateQuiz;
