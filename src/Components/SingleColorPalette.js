import React, { Component } from 'react';
import ColorBox from './ColorBox.js';
import { withStyles } from '@material-ui/styles';
import Navbar from './Navbar.js';
import instance from '../currentHelpers.js';

const styles = {
  backBox: {
    width: "20%",
    height: "50%",
    cursor: "pointer",
    position: "relative",
    background: "black",
    "& button": {
      width: "90px",
      height: "25px",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "0.8rem",
      lineHeight: "25px",
      color: "white",
      border: "none",
      cursor: "pointer"
    }
  }
};

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFormat: instance.colorFormat,
      snackbarOpen: false
    }
    this.changeFormat = this.changeFormat.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
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
    let { colors, paletteName, emoji } = this.props;
    return (
      <div className="Palette">
        <div className="Palette-header">
          <Navbar
            singleColorPalette={true}
            changeFormat={this.changeFormat}
            currentFormat={this.state.currentFormat}
            snackbarOpen={this.state.snackbarOpen}
            closeSnackbar={this.closeSnackbar}
          />
        </div>
        <div className="Palette-colors singleColorPalette">
          {colors.map(color =>
            <ColorBox
              key={color.name}
              color={color[this.state.currentFormat]} {...color}
              showMoreLink={false} />)}
          <div className={this.props.classes.backBox}>
            <button onClick={this.props.history.goBack}>GO BACK</button>
          </div>
        </div>
        <footer className="Palette-footer">
          <span>{paletteName} {emoji}</span>
        </footer>
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);