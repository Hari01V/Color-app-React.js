import sizes from "../sizes";

export default {
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
      color: "rgba(0,0,0,0.7)",
      transition: "all 0.3s ease-in-out"
    },
    "&:hover svg": {
      color: "white",
      transform: "scale(1.1)"
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "20%"
    },
    [sizes.down("sm")]: {
      width: "50%",
      height: "10%"
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "5%"
    }
  }
}