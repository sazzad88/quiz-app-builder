import React, { useState } from "react";
import CreateQuiz from "../components/Quiz/Create";

function Home() {
  const [openModal, setOpenModal] = useState<Boolean>(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="columns">
      <div className="column is-12">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Quiz Dashboard</p>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              nec iaculis mauris.
            </div>

            {openModal ? <CreateQuiz closeModal={closeModal} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
