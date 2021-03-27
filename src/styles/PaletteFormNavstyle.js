import instance from '../currentHelpers';
import sizes from '../sizes';

const drawerWidth = instance.drawerWidth;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    "& h2": {
      fontSize: "1rem",
      fontWeight: "300",
      [sizes.down("xs")]: {
        fontSize: "14px"
      }
    }
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    menuButton: {
      marginRight: theme.spacing(2)
    },
    hide: {
      display: 'none'
    }
  },
  navBtn: {
    display: "flex",
    alignItems: "center",
    margin: "0 0.5rem",
    "& button": {
      [sizes.down("sm")]: {
        fontSize: "10px"
      }
    }
  }
});

export default styles;