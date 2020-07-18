import React, { Component } from "react";
import "../../css/style.css";

class Tile extends Component {
  render() {
    return (
      <div className="tile" value={this.props.value}>
        <strong className={this.props.value}>{this.props.value}</strong>
      </div>
    );
  }
}

export default Tile;
