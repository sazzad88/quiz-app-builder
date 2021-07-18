import React from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Quiz, Store } from "../store/types";
function Home() {
  let history = useHistory();
  const quizList = useSelector((state: Store) => state.quizList).filter(
    (quiz: Quiz) => quiz.valid
  );

  return (
    <div className="columns is-centered is-multiline" id="sectioncontainer">
      <p style={{ textAlign: "right", width: "100%", height: "50px" }}>
        <Link to="/dashboard" className="button is-link">
          Dashboard
        </Link>
      </p>
      {quizList.map((quiz: Quiz) => (
        <div key={quiz.id} className="column is-narrow">
          <article className="message is-success">
            <div className="message-header">
              <p>{quiz.title}</p>
            </div>
            <div className="message-body">
              <div
                className="board-item"
                onClick={() => {
                  history.push(`/quiz/${quiz.id}`);
                }}
              >
                <div className="board-item-content">
                  <span>{quiz.items.length} questions</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      ))}

      {quizList.length === 0 ? (
        <div className="notification is-warning">
          No Quiz Available For Now. You can add your quiz{" "}
          <Link to="/dashboard">Here</Link>
        </div>
      ) : null}
    </div>
  );
}

export default Home;
