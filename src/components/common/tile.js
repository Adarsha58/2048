import React, { Component } from "react";
import "../../css/style.css";

class Tile extends Component {
  render() {
    return (
      <div className="tile" value={this.props.value}>
        <div className="tileNumber">{this.props.value}</div>
      </div>
    );
  }
}

export default Tile;
