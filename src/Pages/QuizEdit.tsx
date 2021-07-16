import React, { useState } from "react";
//import CreateQuiz from "../components/Quiz/Create";

function Home() {
  //   const [openModal, setOpenModal] = useState<Boolean>(false);

  //   const closeModal = () => {
  //     setOpenModal(false);
  //   };

  return (
    <div className="columns">
      <div className="column is-12">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Edit Quiz</p>
            <button
              className="button is-small is-info"
              onClick={() => {
                // setOpenModal(true);
              }}
            >
              Back to quiz list
            </button>
          </header>
          <div className="card-content">
            <div className="content">some quiz with id ....</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
