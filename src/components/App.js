import React, { Component } from "react";
import "../css/style.css";

//components
import Board from "./board";
import ScoreContainer from "./ScoreContainer";
import GameIntro from "./GameIntro";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      newGame: false,
    };

    this.onScoreChange = (scoreIncrease) => {
      this.setState({ score: this.state.score + scoreIncrease });
    };

    this.onNewGame = () => {
      if (!this.state.newGame) {
        this.setState({ newGame: true });
      } else {
        this.setState({ newGame: false });
      }
    };
  }

  render() {
    return (
      <div className="container">
        <div className="title">2048</div>
        <ScoreContainer score={this.state.score} />
        <GameIntro newGameHandler={this.onNewGame} />
        <Board
          scoreChangeHandler={this.onScoreChange}
          newGameButtonPressed={this.state.newGame}
          newGameHandler={this.onNewGame}
        />
      </div>
    );
  }
}
export default App;
