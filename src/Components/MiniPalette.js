import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  card: {
    backgroundColor: "white",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    width: "28%",
    margin: "1%",
    borderRadius: "5px",
    "&:hover": {
      cursor: "pointer"
    }
  },
  cardImg: {
    width: "100%",
    height: "120px",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    borderRadius: "5px",
    overflow: "hidden"
  },
  imgBox: {
    width: "20%",
    height: "25%"
  },
  cardBody: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h2": {
      color: "black",
      fontSize: "10pt",
      margin: "4px",
    }
  }
}

function MiniPalette(props) {
  const { classes } = props;
  return (
    <div className={classes.card} onClick={props.handleClick}>
      <div className={classes.cardImg}>
        {props.colors.map((color) => (
          <div className={classes.imgBox} key={color.name} style={{ background: color.color }}></div>
        ))}
      </div>
      <div className={classes.cardBody}>
        <h2>{props.paletteName}</h2>
        <h2>{props.emoji}</h2>
      </div>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);