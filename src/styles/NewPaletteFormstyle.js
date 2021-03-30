import instance from '../currentHelpers.js';

const drawerWidth = instance.drawerWidth;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
    "& h2": {
      fontSize: "1.1rem",
      fontWeight: "300",
      paddingLeft: "1rem",
      color: "black"
    }
  },
  drawerContent: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& form": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    }
  },
  drawerBtns: {
    width: "100%",
    "& button": {
      fontSize: "0.7rem",
      width: "50%",
      marginBottom: "1rem"
    }
  },
  content: {
    height: `calc(100vh - 64px)`,
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0
  },
});

export default styles;