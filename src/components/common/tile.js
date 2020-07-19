import React, { Component } from "react";
import "../../css/style.css";

class Tile extends Component {
  render() {
    const mystyle = {
      backgroundColor: `rgb(${255 - ((this.props.value * 10) % 255)},${
        200 - ((this.props.value * 7) % 100)
      },${150 - ((this.props.value * 5) % 60)})`,
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
