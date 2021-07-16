import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Store, Quiz, Question } from "../../store/types";
import { useParams } from "react-router-dom";
import CreateQuestion from "./CreateQuestion";

function Edit() {
  const params = useParams();
  const { quizId } = params as {
    quizId: string;
  };
  const quizList = useSelector((state: Store) => state.quizList);
  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
  const [title, setTitle] = useState<string>("");
  const [layout, setLayout] = useState<string>("");

  useEffect(() => {
    const found = quizList.find((item: Quiz) => item.id === quizId);

    if (found) {
      setQuiz(found);
      setTitle(found.title);
      setLayout(found.layout);
    }
  }, []);

  const [openQuestion, setOpenQuestion] = useState<Boolean>(false);

  const closeQuestion = (created: boolean) => {
    setOpenQuestion(false);
    // do something else
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          {quiz.id ? (
            <>
              <div
                className="field is-grouped"
                style={{ justifyContent: "flex-end" }}
              >
                <div className="control">
                  <button className="button is-link is-small">Save</button>
                </div>
              </div>
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    placeholder="Quiz title"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Quiz Template</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={layout}
                      onChange={(e) => {
                        setLayout(e.target.value);
                      }}
                    >
                      <option value="single">
                        All question visible at a time
                      </option>
                      <option value="multi">
                        One quesiton visible at a time
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="card-content mt-20">
        <div className="content">
          {quiz.id ? (
            <>
              {quiz.items.length === 0 ? (
                <div className="notification">
                  Please add some quesitons to your quiz and make it interesting
                </div>
              ) : (
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                  <thead>
                    <tr>
                      <th>
                        <abbr title="Question">Question</abbr>
                      </th>
                      <th className="has-text-centered">
                        <abbr title="Type">Type</abbr>
                      </th>
                      <th className="has-text-centered">
                        <abbr title="Points">Points</abbr>
                      </th>
                      <th className="has-text-centered"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {quiz.items.map((quesiton: Question) => (
                      <tr>
                        <td>{quesiton.text}</td>
                        <td className="has-text-centered">
                          {quesiton.optionType === "multiple" ? (
                            <span className="tag is-black">Multiple</span>
                          ) : (
                            <span className="tag is-link">Single</span>
                          )}
                        </td>
                        <td className="has-text-centered">{quesiton.points}</td>
                        <td className="has-text-centered">Manage</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {openQuestion ? (
                <CreateQuestion quizId={quizId} closeQuestion={closeQuestion} />
              ) : (
                <div
                  className="field is-grouped"
                  style={{ justifyContent: "flex-end" }}
                >
                  <div className="control">
                    <button
                      className="button is-link is-small"
                      onClick={() => setOpenQuestion(true)}
                    >
                      Add Question
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Edit;
