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
    
    //findind the length of tile Value to adjust font
    const len = Math.ceil(Math.log10(this.props.value + 1));
    let fontSize = 65 - 8*(len - 1); 
    return (
      <div className="tile"  style={mystyle}>
        <div className="tileNumber" style={ {fontSize: fontSize.toString()+"px"}}>
          {this.props.value != 0 ? this.props.value : null}
        </div>
      </div>
    );
  }
}

export default Tile;
