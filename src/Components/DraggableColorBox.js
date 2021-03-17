import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';

const styles = {
  root: {
    width: "20%",
    height: "25%",
    display: "inline-block",
    cursor: "pointer",
    marginBottom: "-5.4px",
    position: "relative",
    "& span": {
      position: "absolute",
      left: "0",
      bottom: "0",
      padding: "0.4rem",
      fontSize: "12px",
      textTransform: "uppercase",
      letterSpacing: "2px",
      userSelect: "none"
    },
    "& svg": {
      position: "absolute",
      right: "0",
      bottom: "0",
      margin: "0.4rem",
      transition: "all 0.3s ease-in-out"
    },
    "&:hover svg": {
      color: "white",
      transform: "scale(1.1)"
    }
  }
}

function DraggableColorBox(props) {
  let { classes } = props;
  let { name, color } = props.color;
  return (
    <div className={classes.root} style={{ background: color }}>
      <span>{name}</span>
      <DeleteIcon />
    </div>
  )
}

export default withStyles(styles)(DraggableColorBox);