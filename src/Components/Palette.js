import React, { Component } from 'react';
import './Palette.css';
import ColorBox from './ColorBox.js';
import Navbar from './Navbar.js';
import instance from '../currentHelpers.js';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...(this.props.starterPalette),
      currentLevel: 400,
      currentFormat: instance.colorFormat,
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
    instance.colorFormat = e.target.value;
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
      <ColorBox {...color} key={color.id} color={color[this.state.currentFormat]} paletteId={this.state.id} showMoreLink={true} />
    ));
    return (
      <div className="Palette">
        <div className="Palette-header">
          <Navbar
            singleColorPalette={false}
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
        <footer className="Palette-footer">
          <span>{this.state.paletteName} {this.state.emoji}</span>
        </footer>
      </div>
    );
  }
}

export default Palette;