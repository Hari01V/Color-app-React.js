import sizes from '../sizes.js';

export default {
  ColorBox: {
    width: "20%",
    height: "25%",
    cursor: "pointer",
    position: "relative",
    "&:hover button": {
      opacity: "1"
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
  },
  copyContainer: {
    height: "100%"
  },
  copyButton: {
    width: "100px",
    height: "30px",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    color: "white",
    border: "none",
    opacity: "0",
    transition: "0.5s",
    cursor: "pointer",
    [sizes.down("xs")]: {
      width: "80px",
      height: "25px",
      fontSize: "9pt",
      lineHeight: "9pt",
      marginTop: "-11px",
    }
  },

  boxContent: {
    width: "50%",
    position: "absolute",
    left: "0",
    bottom: "0",
    padding: "0.4rem",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    "& span": {
      [sizes.down("lg")]: {
        fontSize: "7pt"
      },
      [sizes.down("xs")]: {
        fontSize: "8pt"
      }
    }
  },
  seeMore: {
    position: "absolute",
    right: "0",
    bottom: "0",
    padding: "0.4rem",
    margin: "0",
    height: "fit-content",
    fontSize: "12px",
    letterSpacing: "1px",
    background: "rgba(255, 255, 255, 0.3)",
    [sizes.down("xs")]: {
      fontSize: "8pt",
      padding: "0.2rem"
    }
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transform: "scale(0.1)",
    transition: "transform 1s ease-in-out",
    position: "absolute"
  },
  copyOverlayShow: {
    opacity: "1",
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute",
    top: "0",
    left: "0"
  },
  copyMsg: {
    color: "white",
    position: "fixed",
    left: "0",
    top: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    opacity: "0",
    transform: "scale(0.1)",
    zIndex: "0",
    pointerEvents: "none",
    "& h1": {
      fontSize: "4rem",
      fontWeight: "400",
      textTransform: "uppercase",
      textShadow: "1px 2px black",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      padding: "2rem",
      textAlign: "center"
    }
  },
  copyMsgShow: {
    opacity: "1",
    transform: "scale(1)",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s",
    zIndex: "25",
  }
}