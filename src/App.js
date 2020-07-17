import React from "react";
import "./css/style.css";
import Board from "./components/board";

function App() {
  return (
    <div className="container">
      <div>
        <h1 className="title">2048</h1>
        <div className="scores">
          <div className="score">
            <p>SCORE</p>
            <p>{0}</p>
          </div>
          <div className="best">
            <p>BEST</p>
            <p>{0}</p>
          </div>
        </div>
      </div>
      <Board />
    </div>
  );
}

export default App;
