import React, { useState } from "react";
import { AddOption } from "../../store/actions";
import { useDispatch } from "react-redux";

const CreateOption = ({
  quizId,
  questionId,

  closeOption,
}: {
  quizId: string;
  questionId: string;

  closeOption: (option: boolean) => void;
}) => {
  const dispatch = useDispatch();

  const [text, setText] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<{
    text: boolean;
  }>({ text: false });

  const handleOptionCreate = () => {
    if (text.trim().length < 1) {
      setError({ ...error, text: true });
      return;
    }

    dispatch(AddOption(quizId, questionId, text, imageUrl));
    setTimeout(() => {
      closeOption(false);
    }, 200);
  };

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Option</p>
      </header>
      <div className="card-content">
        <div className="content">
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Option text</label>
              <div className="control">
                <input
                  className={`input is-small ${error.text ? "is-danger" : ""}`}
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
                <p className="help is-danger">Option text is required.</p>
              ) : null}
            </div>
            <div className="field">
              <label className="label is-small">Option Image (optional)</label>
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
        </div>
      </div>
      <footer className="card-footer" style={{ padding: "20px" }}>
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-link is-small"
              onClick={handleOptionCreate}
            >
              Add
            </button>
          </div>
          <div className="control">
            <button
              className="button is-small"
              onClick={() => closeOption(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateOption;
