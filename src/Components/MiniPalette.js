import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';
import styles from '../styles/MiniPalettestyle.js';

class MiniPalette extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.stopPropagation();
    this.props.deletePalette(this.props.id);
  }

  render() {
    const { classes, handleClick, colors, paletteName, emoji } = this.props;

    return (
      <div className={classes.card} onClick={handleClick}>
        <div className={classes.cardImg}>
          {colors.map((color) => (
            <div className={classes.imgBox} key={color.name} style={{ background: color.color }}></div>
          ))}
        </div>
        <div className={classes.cardBody}>
          <h2>{paletteName}</h2>
          <h2>{emoji}</h2>
        </div>
        <div className={classes.deleteBtn} onClick={this.handleDelete}>
          <DeleteIcon />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(MiniPalette);