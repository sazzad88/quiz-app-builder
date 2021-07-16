import React, { useState } from "react";
import Edit from "../components/Quiz/Edit";

function QuizEdit() {
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
            <div className="content">
              <Edit />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizEdit;
