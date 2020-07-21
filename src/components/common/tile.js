import React, { Component } from "react";
import "../../css/style.css";

class Tile extends Component {
  render() {
    const mystyle = {
      backgroundColor: `rgb(${
        238 - ((Math.pow(this.props.value, 2) * 20) % 255)
      },${225 - ((Math.pow(this.props.value, 2) * 10) % 100)},${
        215 - ((Math.pow(this.props.value, 2) * 5) % 60)
      })`,
    };
    return (
      <div className="tile" value={this.props.value} style={mystyle}>
        <div className="tileNumber">
          {this.props.value != 0 ? this.props.value : null}
        </div>
      </div>
    );
  }
}

export default Tile;
