import React, { Component } from "react";
import "../css/style.css";
import Tile from "./common/tile";
import cloneDeep from "lodash/cloneDeep";
import GameEndPage from "./common/gameEndPage";

let xCord = null;
let yCord = null;

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

    //binding normal void functions
    this.handleLeft = this.handleLeft.bind(this);
    this.handleRight = this.handleRight.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.handleDown = this.handleDown.bind(this);
  }

  gameEnds = () => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.state.tiles[i][j] == "") return false;

        if (i == 3 && j == 3) {
          return true;
        }

        if (i == 3) {
          if (
            this.state.tiles[i][j + 1] == "" ||
            this.state.tiles[i][j + 1] == this.state.tiles[i][j]
          ) {
            return false;
          }
        } else if (j == 3) {
          if (
            this.state.tiles[i + 1][j] == "" ||
            this.state.tiles[i + 1][j] == this.state.tiles[i][j]
          ) {
            return false;
          }
        } else {
          if (
            this.state.tiles[i][j + 1] == "" ||
            this.state.tiles[i][j + 1] == this.state.tiles[i][j] ||
            this.state.tiles[i + 1][j] == "" ||
            this.state.tiles[i + 1][j] == this.state.tiles[i][j]
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  handleKeyDown = (event) => {
    event.preventDefault();
    switch (event.key) {
      case "ArrowLeft":
        return this.handleLeft();
      case "ArrowRight":
        return this.handleRight();
      case "ArrowUp":
        return this.handleUp();
      case "ArrowDown":
        return this.handleDown();
      default:
        return null;
    }
  };

  handleTouchStart = (e) => {
    const firstTouch = e.touches[0];
    xCord = firstTouch.clientX;
    yCord = firstTouch.clientY;
  };

  handleTouchMove = (e) => {
    if (!xCord || !yCord) return null;
    const firstTouch = e.touches[0];
    let xdiff = firstTouch.clientX - xCord;
    let ydiff = firstTouch.clientY - yCord;
    console.log("AFter", xdiff, ydiff);

    xCord = 0;
    yCord = 0;

    if (xdiff > 0 && (ydiff == 0 || Math.abs(xdiff) > Math.abs(ydiff))) {
      console.log("right");
      return this.handleRight();
    }

    if (xdiff < 0 && (ydiff == 0 || Math.abs(xdiff) > Math.abs(ydiff))) {
      return this.handleLeft();
    }
    if (ydiff < 0 && (xdiff == 0 || Math.abs(xdiff) < Math.abs(ydiff))) {
      return this.handleUp();
    }
    if (ydiff > 0 && (xdiff == 0 || Math.abs(xdiff) < Math.abs(ydiff))) {
      return this.handleDown();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.getElementById("game-board").addEventListener("touchstart", this.handleTouchStart, false);
    document.getElementById("game-board").addEventListener("touchmove", this.handleTouchMove, false);
  }

  componentDidUpdate() {
    if (this.props.newGameButtonPressed === true) {
      this.resetBoard();
      this.props.newGameHandler();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
    document.getElementById("game-board").removeEventListener("touchstart", this.handleTouchStart, false);
    document.getElementById("game-board").removeEventListener("touchmove", this.handleTouchMove, false);
  }

  resetBoard = () => {
    let tiles = [
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
      ["", "", "", ""],
    ];
    this.initializeTiles(tiles);
    this.setState({ tiles });
  };

  addARandomTile(tiles) {
    let row, col;
    do {
      row = Math.floor(Math.random() * 4);
      col = Math.floor(Math.random() * 4);
    } while (tiles[row][col] !== "");
    let twoOrFour = Math.floor(Math.random() * 2 + 1) * 2;
    tiles[row][col] = twoOrFour.toString();
  }

  handleLeft() {
    let scoreIncrease = 0;
    let tiles = cloneDeep(this.state.tiles);

    let didChange = 0;
    for (var i = 0; i < 4; i++) {
      let isfinalized = 1;
      for (var j = 1; j < 4; j++) {
        let itr = j;
        while (itr >= isfinalized) {
          if (tiles[i][itr] === "") break;

          if (tiles[i][itr - 1] === "") {
            tiles[i][itr - 1] = tiles[i][itr];
            tiles[i][itr] = "";
            didChange++;
          } else if (tiles[i][itr] === tiles[i][itr - 1]) {
            tiles[i][itr] = "";
            tiles[i][itr - 1] = eval(
              tiles[i][itr - 1] + "+" + tiles[i][itr - 1]
            ).toString();
            scoreIncrease += parseInt(tiles[i][itr - 1]);
            didChange++;
            isfinalized++;
            break;
          } else {
            isfinalized++;
            break;
          }
          itr--;
        }
      }
    }
    if (didChange > 0) this.addARandomTile(tiles);
    this.setState({ tiles });
    if (scoreIncrease > 0) this.props.scoreChangeHandler(scoreIncrease);
  }

  handleRight() {
    let tiles = cloneDeep(this.state.tiles);
    let didChange = 0;
    let scoreIncrease = 0;

    for (var i = 0; i < 4; i++) {
      let isfinalized = 2;
      for (var j = 2; j >= 0; j--) {
        let itr = j;
        while (itr <= isfinalized) {
          if (tiles[i][itr] === "") break;

          if (tiles[i][itr + 1] === "") {
            tiles[i][itr + 1] = tiles[i][itr];
            tiles[i][itr] = "";
            didChange++;
          } else if (tiles[i][itr] === tiles[i][itr + 1]) {
            tiles[i][itr] = "";
            tiles[i][itr + 1] = eval(
              tiles[i][itr + 1] + "+" + tiles[i][itr + 1]
            ).toString();
            scoreIncrease += parseInt(tiles[i][itr + 1]);
            didChange++;
            isfinalized--;
            break;
          } else {
            isfinalized--;
            break;
          }
          itr++;
        }
      }
    }
    if (didChange > 0) this.addARandomTile(tiles);
    this.setState({ tiles });
    if (scoreIncrease > 0) this.props.scoreChangeHandler(scoreIncrease);
  }

  handleUp() {
    let tiles = cloneDeep(this.state.tiles);
    let didChange = 0;
    let scoreIncrease = 0;

    for (var j = 0; j < 4; j++) {
      let isfinalized = 1;
      for (var i = 1; i < 4; i++) {
        let itr = i;

        while (itr >= isfinalized) {
          if (tiles[itr][j] === "") break;

          if (tiles[itr - 1][j] === "") {
            tiles[itr - 1][j] = tiles[itr][j];
            tiles[itr][j] = "";
            didChange++;
          } else if (tiles[itr][j] === tiles[itr - 1][j]) {
            tiles[itr][j] = "";
            tiles[itr - 1][j] = eval(
              tiles[itr - 1][j] + "+" + tiles[itr - 1][j]
            ).toString();
            isfinalized++;
            scoreIncrease += parseInt(tiles[itr - 1][j]);
            didChange++;
            break;
          } else {
            isfinalized++;
            break;
          }
          itr--;
        }
      }
    }
    if (didChange > 0) this.addARandomTile(tiles);
    this.setState({ tiles });
    if (scoreIncrease > 0) this.props.scoreChangeHandler(scoreIncrease);
  }

  handleDown() {
    let tiles = cloneDeep(this.state.tiles);
    let didChange = 0;
    let scoreIncrease = 0;

    for (var j = 0; j < 4; j++) {
      let isfinalized = 2;
      for (var i = 2; i >= 0; i--) {
        let itr = i;
        while (itr <= isfinalized) {
          if (tiles[itr][j] === "") break;

          if (tiles[itr + 1][j] === "") {
            tiles[itr + 1][j] = tiles[itr][j];
            tiles[itr][j] = "";
            didChange++;
          } else if (tiles[itr][j] === tiles[itr + 1][j]) {
            tiles[itr][j] = "";
            tiles[itr + 1][j] = eval(
              tiles[itr + 1][j] + "+" + tiles[itr + 1][j]
            ).toString();
            isfinalized--;
            scoreIncrease += parseInt(tiles[itr + 1][j]);
            didChange++;
            break;
          } else {
            isfinalized--;
            break;
          }
          itr++;
        }
      }
    }

    if (didChange > 0) this.addARandomTile(tiles);
    this.setState({ tiles });
    if (scoreIncrease > 0) this.props.scoreChangeHandler(scoreIncrease);
  }

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
                  value={col !== "" ? parseInt(col, 10) : 0}
                  key={`${colIndex}+${rowIndex}`}
                  id={`${colIndex}+${rowIndex}`}
                />
              );
            });
          })}
        </div>
        {
          this.gameEnds() ?
            <div className="gameEndPage">
              <GameEndPage/>
            </div>
            : null
        }

      </div>
    );
  }
}

export default Board;
