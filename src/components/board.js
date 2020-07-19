import React, { Component } from "react";
import "../css/style.css";
import Tile from "./common/tile";
import cloneDeep from "lodash/cloneDeep";

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
    this.initializeTiles(this.state.tiles);
    this.handleLeft = this.handleLeft.bind(this);
  }

  handleKeyDown = (event) => {
    return this.handleLeft();
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  gameEnds = (tiles) => false;

  handleLeft() {
    let tiles = cloneDeep(this.state.tiles);

    for (var i = 0; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        let itr = j;
        while (itr > 0) {
          if (tiles[i][itr] === "") break;

          if (tiles[i][itr - 1] === "") {
            tiles[i][itr - 1] = tiles[i][itr];
            tiles[i][itr] = "";
          } else if (tiles[i][itr] === tiles[i][itr - 1]) {
            tiles[i][itr] = "";
            tiles[i][itr - 1] = eval(tiles[i][itr - 1] + tiles[i][itr - 1]);
          } else {
            break;
          }
          itr--;
        }
      }
    }
    this.setState({ tiles: tiles });
  }

  handleRight = (tiles) => {
    console.log("Right");
  };
  handleUp = (tiles) => {
    console.log("Up");
    return false;
  };
  handleDown = (tiles) => {
    console.log("Down");
    return false;
  };

  initializeTiles = (tiles) => {
    //initializing the board with two random tiles
    let row, col, twoOrFour, row1;
    row = Math.floor(Math.random() * 4);
    col = Math.floor(Math.random() * 4);
    row1 = Math.floor(Math.random() * 3);
    if (row === row1) row1++;
    twoOrFour = Math.floor(Math.random() * 2 + 1) * 2;
    tiles[row][col] = twoOrFour.toString();
    twoOrFour = Math.floor(Math.random() * 2 + 1) * 2;
    col = Math.floor(Math.random() * 4);
    tiles[row1][col] = twoOrFour.toString();
  };

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
