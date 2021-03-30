import React, { Component } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LibraryAddRoundedIcon from '@material-ui/icons/LibraryAddRounded';
import { withStyles } from "@material-ui/core/styles";
import PaletteMetaForm from './PaletteMetaForm';
import styles from '../styles/PaletteFormNavstyle.js';

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, open, handleDrawerOpen, submitPalette } = this.props;

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
            {!open &&
              <h2>Create A Palette</h2>}
          </Toolbar>
          <div className={classes.navBtn}>
            <PaletteMetaForm
              palettes={this.props.palettes}
              submitPalette={submitPalette} />
            <Button
              variant="contained"
              color="secondary"
              onClick={this.props.history.goBack}
              style={{ margin: "0 1rem" }}>Go Back</Button>
          </div>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
