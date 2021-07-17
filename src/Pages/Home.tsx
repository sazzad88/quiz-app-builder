import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Option, Question, Quiz, Store } from "../store/types";
function Home() {
  let history = useHistory();
  const quizList = useSelector((state: Store) => state.quizList);
  return (
    <div className="columns is-centered is-multiline" id="sectioncontainer">
      {quizList.map((quiz: Quiz) => (
        <div key={quiz.id} className="column is-narrow">
          <article className="message is-success">
            <div className="message-header">
              <p>{quiz.title}</p>
              {/* <button className="delete" aria-label="delete"></button> */}
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
    </div>
  );
}

export default Home;
