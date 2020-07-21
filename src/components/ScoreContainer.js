import React, { Component } from "react";
import "../css/style.css";

class ScoreContainer extends Component {
  render() {
    return (
      <div className="scores">
        <div className="score">
          <p>SCORE</p>
          <p>{this.props.score}</p>
        </div>
        <div className="best">
          <p>BEST</p>
          <p>{0}</p>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default ScoreContainer;
