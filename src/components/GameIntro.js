import React, { Component } from "react";
import "../css/style.css";

class GameIntro extends Component {
  render() {
    return (
      <div className="gameIntro">
        <p className="gameInstruction">
          Join the numbers and get to the <strong>2048</strong> tile!
        </p>
        <button
          className="newGameButton"
          type="button"
          onClick={(e) => {
            this.props.newGameHandler();
          }}
        >
          <strong>NEW GAME</strong>
        </button>
      </div>
    );
  }
}

export default GameIntro;
