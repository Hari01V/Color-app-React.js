import React, { Component } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
  render() {
    let { currentLevel, currentFormat, changeSlider, changeFormat, snackbarOpen, closeSnackbar, singleColorPalette } = this.props;

    return (
      <div className="Navbar">
        <Link to="/">ReactColorPicker</Link>
        {!singleColorPalette &&
          <div className="Navbar-Level-Slider">
            <Slider
              defaultValue={currentLevel}
              min={100}
              max={900}
              step={100}
              onChange={(value) => changeSlider(value)}
            />
          </div>}
        <div className="select-container">
          <FormControl variant="outlined" >
            <InputLabel id="select-label">Format</InputLabel>
            <Select
              labelId="select-label"
              id="select-format"
              value={currentFormat}
              onChange={changeFormat}
              label="Format"
            >
              <MenuItem value="hex">HEX - #ffffff</MenuItem>
              <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
              <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1)</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={closeSnackbar}
          message={<span id="message-id">Format Changed to {currentFormat}</span>}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
        />
      </div>
    );
  }
}

export default Navbar;