import React, { Component } from 'react';
import MiniPalette from './MiniPalette.js';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

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
    alignItems: "baseline",
    "& h1": {
      margin: "0.5rem 0",
      color: "white"
    },
    "& a": {
      color: "white",
      margin: "0 0.5rem",
      backgroundColor: "transparent",
      fontSize: "10pt"
    },
    "& a:hover": {
      textDecoration: "none",
      cursor: "pointer"
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
            <Link to="/palette/new">Create Palette</Link>
          </div>
          <div className={this.props.classes.palettes}>
            {this.props.palettes.map(palette => (
              <MiniPalette {...palette} key={palette.id} handleClick={() => this.goToPalette(palette.id)} deletePalette={this.props.deletePalette} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);