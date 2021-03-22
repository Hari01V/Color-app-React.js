import React, { Component } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';
import DraggableColorList from './DraggableColorList.js';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav.js';
import ColorPickerForm from './ColorPickerForm.js';
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
    justifyContent: 'flex-end'
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
class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colors: this.props.palettes[0].colors
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.addNewColor = this.addNewColor.bind(this);
    this.submitPalette = this.submitPalette.bind(this);
    this.deleteDraggableColorBox = this.deleteDraggableColorBox.bind(this);
    this.clearPalette = this.clearPalette.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  };

  handleDrawerClose() {
    this.setState({ open: false });
  };

  handleNameChange(e) {
    this.setState(st => ({
      [e.target.name]: e.target.value
    }));
  }

  addNewColor(newColor) {
    this.setState(st => ({
      colors: [...st.colors, newColor],
    }));
  }

  deleteDraggableColorBox(name) {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== name)
    });
  }

  submitPalette(paletteName, emoji) {
    let newPalette = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      emoji: emoji.native,
      colors: this.state.colors
    }
    this.props.savePalette(newPalette);
    this.props.history.push("/");
  }

  clearPalette() {
    this.setState({
      colors: []
    })
  }
  addRandomColor() {
    const allColors = this.props.palettes.map(p => p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    this.setState({
      colors: [...this.state.colors, allColors[rand]]
    })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  render() {
    const { classes, maxColors } = this.props;
    const { open, newPaletteName, colors } = this.state;

    let isPaletteFull = colors.length >= maxColors ? true : false;

    return (
      <div className={classes.root} >
        <PaletteFormNav
          open={open}
          newPaletteName={newPaletteName}
          handleDrawerOpen={this.handleDrawerOpen}
          handleNameChange={this.handleNameChange}
          submitPalette={this.submitPalette}
          palettes={this.props.palettes} />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.drawerContent}>
            <h2 style={{ fontWeight: 300, fontSize: "1rem", letterSpacing: "1px" }}>Design Your Palette</h2>
            <div className={classes.drawerBtns}>
              <Button
                variant="contained" color="secondary"
                onClick={this.clearPalette}>Clear Palette</Button>
              <Button
                variant="contained" color="primary"
                onClick={this.addRandomColor}
                disabled={isPaletteFull}>Random Color</Button>
            </div>
            <ColorPickerForm
              isPaletteFull={isPaletteFull}
              addNewColor={this.addNewColor}
              colors={colors} />
          </div>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            deleteDraggableColorBox={this.deleteDraggableColorBox}
            axis="xy"
            onSortEnd={this.onSortEnd} />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);