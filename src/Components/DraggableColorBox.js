import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';
import { SortableElement } from 'react-sortable-hoc';
import chroma from 'chroma-js';
import styles from '../styles/DraggableColorBoxstyle.js';

const DraggableColorBox = SortableElement(props => {
  const { classes, deleteBox } = props;
  const { name, color } = props.color;
  let txtColor = chroma(color).luminance() >= 0.3 ? chroma(color).luminance(0) : chroma(color).luminance(1);
  return (
    <div className={classes.root} style={{ background: color, color: txtColor }}>
      <span>{name}</span>
      <DeleteIcon onClick={deleteBox} />
    </div>
  )
});

export default withStyles(styles)(DraggableColorBox);