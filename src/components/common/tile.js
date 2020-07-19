import React, { Component } from "react";
import "../../css/style.css";

class Tile extends Component {
  render() {
    const mystyle = {
      backgroundColor: `rgb(${238 - ((this.props.value * 20) % 255)},${
        225 - ((this.props.value * 10) % 100)
      },${215 - ((this.props.value * 5) % 60)})`,
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
