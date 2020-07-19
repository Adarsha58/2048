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
        <div className="gameIntro">
          <p className="gameInstruction">
            Join the numbers and get to the <strong>2048</strong> tile!
          </p>
          <button className="newGameButton" type="button">
            <strong>NEW GAME</strong>
          </button>
        </div>
        <Board />
      </div>
    </div>
  );
}

export default App;
