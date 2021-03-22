import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';

const styles = {
  card: {
    backgroundColor: "white",
    padding: "12px",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: "28%",
    margin: "1%",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover svg": {
      opacity: "1"
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
  },
  deleteBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: "0",
    top: "0",
    "& svg": {
      color: "white",
      background: "red",
      padding: "0.2rem",
      opacity: "0",
      transition: "all 0.2s ease-in-out"
    }
  }
}

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