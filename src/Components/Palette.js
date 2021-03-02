import React, { Component } from 'react';
import './Palette.css';
import ColorBox from './ColorBox.js';
import { generatePalette } from '../colorHelpers.js';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...generatePalette(this.props.starterPalette),
      currentLevel: 500
    }
  }

  render() {
    let level = this.state.currentLevel;
    const colorBoxes = this.state.colors[level].map(color => (
      <ColorBox {...color} />
    ));
    return (
      <div className="Palette">
        <div style={{ height: "10vh" }}></div>
        {/* Navbar goes here */}
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        {/* footer */}
      </div>
    );
  }
}

export default Palette;