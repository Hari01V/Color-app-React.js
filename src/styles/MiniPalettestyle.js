import sizes from "../sizes";

export default {
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
    },
    [sizes.down("sm")]: {
      width: "40%",
      margin: "2%"
    },
    [sizes.down("xs")]: {
      width: "80%",
      margin: "0.5rem 10%"
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