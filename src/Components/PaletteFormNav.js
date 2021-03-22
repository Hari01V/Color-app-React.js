import React, { Component } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LibraryAddRoundedIcon from '@material-ui/icons/LibraryAddRounded';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import instance from '../currentHelpers';
import PaletteMetaForm from './PaletteMetaForm';

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
    justifyContent: "space-between"
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
    margin: "0 0.5rem"
  }
});

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, open, newPaletteName, handleDrawerOpen, handleNameChange, submitPalette } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          color="default"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          <Toolbar>
            {!open &&
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}>
                <LibraryAddRoundedIcon />
              </IconButton>
            }
            <h2 style={{ fontWeight: 300, fontSize: "1rem" }}>Create A Palette</h2>
          </Toolbar>
          <div className={classes.navBtn}>
            <PaletteMetaForm
              palettes={this.props.palettes}
              submitPalette={submitPalette} />
            <Link to="/" style={{ margin: "0 1rem" }} >
              <Button variant="contained" color="secondary">Go Back</Button>
            </Link>
          </div>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
