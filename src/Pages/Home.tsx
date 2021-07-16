import React from "react";

function Home() {
  return (
    <div className="columns is-centered is-multiline" id="sectioncontainer">
      <div className="column is-narrow">
        <article className="message is-success">
          <div className="message-header">
            <p>something</p>
            <button className="delete" aria-label="delete"></button>
          </div>
          <div className="message-body">
            <div className="board-item">
              <div className="board-item-content" v-for="item in yxy.items">
                <span>ss</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Home;
