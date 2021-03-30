import React, { Component } from 'react';
import ColorBox from './ColorBox.js';
import Navbar from './Navbar.js';
import instance from '../currentHelpers.js';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/Palettestyle.js';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...(this.props.starterPalette),
      currentLevel: 400,
      currentFormat: instance.colorFormat,
      snackbarOpen: false,
      colorBoxOverflow: false
    }
    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.changeColorBoxOverflow = this.changeColorBoxOverflow.bind(this);
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

  changeColorBoxOverflow(value) {
    this.setState({
      colorBoxOverflow: value
    });
  }

  render() {
    let level = this.state.currentLevel;
    const { classes } = this.props;
    const colorBoxes = this.state.colors[level].map(color => (
      <ColorBox {...color}
        key={color.id}
        color={color[this.state.currentFormat]}
        paletteId={this.state.id}
        showMoreLink={true}
        changeColorBoxOverflow={this.changeColorBoxOverflow}
      />
    ));
    return (
      <div className={classes.Palette} style={{ overflowY: this.state.colorBoxOverflow ? "hidden" : "auto" }}>
        <div className={classes.PaletteHeader}>
          <Navbar
            singleColorPalette={false}
            currentLevel={this.state.currentLevel}
            changeSlider={this.changeLevel}
            changeFormat={this.changeFormat}
            currentFormat={this.state.currentFormat}
            snackbarOpen={this.state.snackbarOpen}
            closeSnackbar={this.closeSnackbar} />
        </div>
        <div className={classes.PaletteColors}>
          {colorBoxes}
        </div>
        <footer className={classes.PaletteFooter}>
          <span>{this.state.paletteName} {this.state.emoji}</span>
        </footer>
      </div>
    );
  }
}

export default withStyles(styles)(Palette);