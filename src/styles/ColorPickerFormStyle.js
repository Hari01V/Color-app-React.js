export default {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  picker: {
    margin: "1rem"
  },
  form: {
    width: "100%",
    "& div": {
      width: "100%",
      "& label": {
        padding: "0 0.5rem"
      },
      "& input": {
        paddingLeft: "0.5rem"
      },
      "& p": {
        paddingLeft: "0.5rem"
      }
    },
    "& button": {
      width: "100%",
      margin: "0.5rem 0"
    }
  }
}