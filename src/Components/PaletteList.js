import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import seedPalettes from '../seedPalettes';
import MiniPalette from './MiniPalette.js';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    backgroundColor: "blue",
    padding: "1rem",
    minHeight: "100vh"
  },
  container: {
    width: "800px",
    backgroundColor: "transparent",
    height: "100%",
    margin: "0 auto"
  },
  nav: {
    padding: "0 12px",
    display: "flex",
    justifyContent: "space-between",
    "& h1": {
      margin: "0.5rem 0",
      color: "white"
    }
  },
  palettes: {
    display: "flex",
    flexWrap: "wrap",
  }
};

class PaletteList extends Component {

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`)
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.container}>
          <div className={this.props.classes.nav}>
            <h1>React Colors</h1>
          </div>
          <div className={this.props.classes.palettes}>
            {seedPalettes.map(palette => (
              <MiniPalette {...palette} handleClick={() => this.goToPalette(palette.id)} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);