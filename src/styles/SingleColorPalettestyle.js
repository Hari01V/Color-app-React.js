import sizes from "../sizes";

export default {
  Palette: {
    height: "100vh",
    overflowX: "hidden"
  },
  PaletteHeader: {
    height: "10%",
    minHeight: "80px"
  },
  PaletteColors: {
    height: "85%",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start"
  },
  singleColorPalette: {
    "& >div": {
      height: "50%",
      [sizes.down("lg")]: {
        width: "20%",
        height: "50%"
      },
      [sizes.down("sm")]: {
        width: "50%",
        height: "20%"
      },
      [sizes.down("xs")]: {
        width: "100%",
        height: "10%"
      }
    }
  },
  backBox: {
    width: "20%",
    height: "50%",
    cursor: "pointer",
    position: "relative",
    background: "black",
    "& button": {
      width: "90px",
      height: "25px",
      position: "absolute",
      top: "50%",
      left: "50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      outline: "none",
      background: "rgba(255, 255, 255, 0.3)",
      fontSize: "0.8rem",
      lineHeight: "25px",
      color: "white",
      border: "none",
      cursor: "pointer"
    }
  },
  PaletteFooter: {
    height: "4%",
    marginRight: "3rem",
    fontWeight: "500",
    fontSize: "11pt",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  }
}