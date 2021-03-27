import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';
import { SortableElement } from 'react-sortable-hoc';
import styles from '../styles/DraggableColorBoxstyle.js';

const DraggableColorBox = SortableElement(props => {
  let { classes, deleteBox } = props;
  let { name, color } = props.color;
  return (
    <div className={classes.root} style={{ background: color }}>
      <span>{name}</span>
      <DeleteIcon onClick={deleteBox} />
    </div>
  )
});

export default withStyles(styles)(DraggableColorBox);