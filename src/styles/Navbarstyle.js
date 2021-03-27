import sizes from "../sizes";

export default {
  Navbar: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& a": {
      height: "100%",
      color: "black",
      background: "#eceff1",
      textDecoration: "none",
      fontFamily: "sans - serif",
      letterSpacing: "2px",
      padding: "1rem",
      marginRight: "12px",
      display: "flex",
      alignItems: "center",
      [sizes.down("sm")]: {
        display: "none"
      }
    }
  },

  NavbarLevelSlider: {
    width: "500px",
    margin: "1rem",
    padding: "1rem",
    "& div": {
      "& div:nth-child(1)": {
        height: "8px"
      },
      "& div:nth-child(2)": {
        height: "8px"
      },
      "& div:nth-child(4)": {
        width: "15px",
        height: "15px",
        marginTop: "-4px"
      }
    }
  },

  selectContainer: {
    marginRight: "4rem",
    "& div": {
      width: "300px",
      [sizes.down("sm")]: {
        width: "200px",
        fontSize: "12px"
      },
      [sizes.down("lg")]: {
        width: "250px"
      }
    },
    "& li": {
      background: "red"
    },
    [sizes.down("lg")]: {
      marginRight: "2rem"
    },
    [sizes.down("sm")]: {
      marginRight: "1rem"
    }
  }
}