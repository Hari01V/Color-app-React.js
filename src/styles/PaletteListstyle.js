import sizes from '../sizes.js';
import bg from '../Confetti-Doodles.svg';

export default {
  root: {
    backgroundColor: "#0826aa",
    backgroundImage: `url(${bg})`,
    padding: "1rem",
    minHeight: "100vh"
  },
  container: {
    width: "780px",
    backgroundColor: "transparent",
    height: "100%",
    margin: "0 auto",
    [sizes.down("md")]: {
      width: "100%"
    }
  },
  nav: {
    padding: "0 12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    "& h1": {
      margin: "0.5rem 0",
      color: "white"
    },
    "& a": {
      color: "white",
      margin: "0 0.5rem",
      backgroundColor: "transparent",
      fontSize: "10pt"
    },
    "& a:hover": {
      textDecoration: "none",
      cursor: "pointer"
    }
  },
  palettes: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  }
}