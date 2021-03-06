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
import styles from '../styles/NewPaletteFormstyle.js';
import seedPalettes from '../seedPalettes.js';

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colors: seedPalettes[0].colors
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
    let allColors = this.props.palettes.map(p => p.colors).flat();
    console.log(allColors.length);
    if (allColors.length > 20) {
      allColors = this.props.palettes.map(p => p.colors).flat();
    } else {
      allColors = seedPalettes.map(p => p.colors).flat();
    }
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      var rand = Math.floor(Math.random() * allColors.length);
      var randomColor = allColors[rand];
      isDuplicateColor = this.state.colors.some(color => color.name === randomColor.name);
    }
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
          palettes={this.props.palettes}
          history={this.props.history} />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}>
          <div className={classes.drawerHeader}>
            <h2>Create A Palette</h2>
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
            onSortEnd={this.onSortEnd}
            distance={10} />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);