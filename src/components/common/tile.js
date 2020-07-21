import React, { Component } from "react";
import "../../css/style.css";

class Tile extends Component {
  render() {
    const mystyle = {
      backgroundColor: `rgb(${
        (255 * (1 - Math.pow(Math.log2(this.props.value + 1) / 12, 2))) % 256
      },${
        (255 *
          (1 -
            Math.sin((Math.log2(this.props.value + 1) / 12) * Math.PI * 0.5))) %
        256
      },${
        (255 * (1 - Math.pow(Math.log2(this.props.value + 1) / 12, 0.5))) % 256
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
