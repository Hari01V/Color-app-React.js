import React, { Component } from 'react';
import MiniPalette from './MiniPalette.js';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import styles from '../styles/PaletteListstyle.js';

class PaletteList extends Component {

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`)
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.container}>
          <div className={this.props.classes.nav}>
            {/* <h1>React Colors</h1> */}
            <Link to="/"><h1>React Colors</h1></Link>
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