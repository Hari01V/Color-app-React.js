import React, { Component } from 'react';
import './Palette.css';
import ColorBox from './ColorBox.js';
import { generatePalette } from '../colorHelpers.js';
import Navbar from './Navbar.js';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...generatePalette(this.props.starterPalette),
      currentLevel: 400,
      currentFormat: "hex",
      snackbarOpen: false
    }
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  changeLevel(level) {
    this.setState({
      currentLevel: level
    });
  }

  changeFormat(e) {
    this.setState({
      currentFormat: e.target.value,
      snackbarOpen: true
    });
  }

  closeSnackbar(e, reason) {
    if (reason === "clickaway" || true) {
      this.setState({
        snackbarOpen: false
      });
    }
  }

  render() {
    let level = this.state.currentLevel;
    const colorBoxes = this.state.colors[level].map(color => (
      <ColorBox {...color} color={color[this.state.currentFormat]} />
    ));
    return (
      <div className="Palette">
        <div className="Palette-header">
          <Navbar
            currentLevel={this.state.currentLevel}
            changeSlider={this.changeLevel}
            changeFormat={this.changeFormat}
            currentFormat={this.state.currentFormat}
            snackbarOpen={this.state.snackbarOpen}
            closeSnackbar={this.closeSnackbar} />
        </div>
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        {/* footer */}
      </div>
    );
  }
}

export default Palette;