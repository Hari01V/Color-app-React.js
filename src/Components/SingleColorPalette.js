import React, { Component } from 'react';
import ColorBox from './ColorBox.js';
import Navbar from './Navbar.js';
import instance from '../currentHelpers.js';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/SingleColorPalettestyle.js';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFormat: instance.colorFormat,
      snackbarOpen: false,
      colorBoxOverflow: false
    }
    this.changeFormat = this.changeFormat.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
    this.changeColorBoxOverflow = this.changeColorBoxOverflow.bind(this);
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
    let { colors, paletteName, emoji } = this.props;
    const { classes } = this.props;
    return (
      <div className={classes.Palette} style={{ overflowY: this.state.colorBoxOverflow ? "hidden" : "scroll" }}>
        <div className={classes.PaletteHeader}>
          <Navbar
            singleColorPalette={true}
            changeFormat={this.changeFormat}
            currentFormat={this.state.currentFormat}
            snackbarOpen={this.state.snackbarOpen}
            closeSnackbar={this.closeSnackbar}
          />
        </div>
        <div className={`${classes.PaletteColors} ${classes.singleColorPalette}`}>
          {colors.map(color =>
            <ColorBox
              key={color.name}
              color={color[this.state.currentFormat]} {...color}
              showMoreLink={false}
              changeColorBoxOverflow={this.changeColorBoxOverflow} />)}
          <div className={classes.backBox}>
            <button onClick={this.props.history.goBack}>GO BACK</button>
          </div>
        </div>
        <footer className={classes.PaletteFooter}>
          <span>{paletteName} {emoji}</span>
        </footer>
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);