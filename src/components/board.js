import React, { Component } from "react";
import "../css/style.css";
import Tile from "./common/tile";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
      ],
    };
  }

  startGame = () => {};

  render() {
    return (
      <div className="boardContainer">
        <div className="tileContainer">
          {this.state.tiles.map((row, rowIndex) => {
            return row.map((col, colIndex) => {
              return (
                <Tile
                  value={col}
                  key={`${colIndex}+${rowIndex}`}
                  id={`${colIndex}+${rowIndex}`}
                />
              );
            });
          })}
        </div>
      </div>
    );
  }
}

export default Board;
