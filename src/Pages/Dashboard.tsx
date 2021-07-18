import React, { useState } from "react";
import CreateQuiz from "../components/Dashboard/Create";
import QuizName from "../components/Dashboard/QuizName";
import { useSelector } from "react-redux";
import { Quiz, Store } from "../store/types";

function Home() {
  const quizList = useSelector((state: Store) => state.quizList);
  const [openModal, setOpenModal] = useState<Boolean>(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="columns">
      <div className="column is-12">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Quiz Management</p>
            <button
              className="button is-small is-info"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Add New Quiz
            </button>
          </header>
          <div className="card-content">
            <div className="content">
              {quizList.map((quiz: Quiz) => (
                <QuizName key={quiz.id} quiz={quiz} />
              ))}

              {quizList.length === 0 ? <p>Empty list</p> : null}
            </div>

            {openModal ? <CreateQuiz closeModal={closeModal} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
