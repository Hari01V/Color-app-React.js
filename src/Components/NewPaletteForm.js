import React, { Component } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LibraryAddRoundedIcon from '@material-ui/icons/LibraryAddRounded';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';
import DraggableColorBox from './DraggableColorBox.js';
import DraggableColorList from './DraggableColorList.js';
import { arrayMove } from 'react-sortable-hoc';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
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
    "& div": {
      "& button": {
        fontSize: "0.7rem"
      }
    },
    "& form": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
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
      pickedColor: "blue",
      newColorName: "",
      newPaletteName: "",
      colors: this.props.palettes[0].colors
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handlePickerChange = this.handlePickerChange.bind(this);
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

  handlePickerChange(color) {
    this.setState({ pickedColor: color.hex });
  }

  handleNameChange(e) {
    this.setState(st => ({
      [e.target.name]: e.target.value
    }));
  }

  addNewColor() {
    let newColor = {
      name: this.state.newColorName.toLowerCase(),
      color: this.state.pickedColor
    }
    this.setState(st => ({
      colors: [...st.colors, newColor],
      newColorName: ""
    }));
  }

  deleteDraggableColorBox(name) {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== name)
    });
  }

  submitPalette() {
    let paletteName = this.state.newPaletteName;
    let newPalette = {
      paletteName: paletteName,
      id: paletteName.toLowerCase().replace(/ /g, "-"),
      emoji: "🇫🇷",
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

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      let isMatch = this.state.colors.find(color => color.name === value.toLowerCase());
      if (!isMatch) {
        return true;
      } else {
        return false;
      }
    });
    ValidatorForm.addValidationRule('isColorUnique', (value) => {
      let isMatch = this.state.colors.find(color => color.color === this.state.pickedColor);
      if (!isMatch) {
        return true;
      } else {
        return false;
      }
    });
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      let isMatch = this.props.palettes.find(palette => palette.paletteName === value.toLowerCase());
      if (!isMatch) {
        return true;
      } else {
        return false;
      }
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isColorNameUnique');
    ValidatorForm.removeValidationRule('isColorUnique');
    ValidatorForm.removeValidationRule('isPaletteNameUnique');
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  render() {
    const { classes, maxColors } = this.props;
    const { open, pickedColor, newColorName, newPaletteName, colors } = this.state;

    let isPaletteFull = colors.length >= maxColors ? true : false;

    return (
      <div className={classes.root} >
        <CssBaseline />
        <AppBar
          color="default"
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <LibraryAddRoundedIcon />
            </IconButton>
            <h2 style={{ fontWeight: 300, fontSize: "1rem" }}>Create A Palette</h2>
            <ValidatorForm
              onSubmit={this.submitPalette}
            >
              <TextValidator
                label="Palette Name"
                onChange={this.handleNameChange}
                name="newPaletteName"
                type="text"
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['this field is required', 'Palette Name should be Unique!']}
                value={newPaletteName}
                style={{ background: "rgba(0, 0, 0, 0.09)", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                style={{ background: pickedColor }}>Save Palette</Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.drawerContent}>
            <h2 style={{ fontWeight: 300, fontSize: "1rem", letterSpacing: "1px" }}>Design Your Palette</h2>
            <div>
              <Button
                variant="contained" color="secondary"
                onClick={this.clearPalette}>Clear Palette</Button>
              <Button
                variant="contained" color="primary"
                onClick={this.addRandomColor}
                disabled={isPaletteFull}>Random Color</Button>
            </div>
            <ChromePicker
              color={pickedColor}
              onChange={this.handlePickerChange}
              onChangeComplete={this.handlePickerChange} />
            <ValidatorForm
              onSubmit={this.addNewColor}
            >
              <TextValidator
                label="Color Name"
                onChange={this.handleNameChange}
                name="newColorName"
                type="text"
                validators={['required', 'isColorNameUnique', 'isColorUnique']}
                errorMessages={['this field is required', 'Color Name should be unique!', 'Color already exists!']}
                value={newColorName}
                style={{ background: "rgba(0, 0, 0, 0.09)", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                style={{ background: isPaletteFull ? "grey" : pickedColor }}
                disabled={isPaletteFull}>{isPaletteFull ? "Palette Full" : "Add Color"}</Button>
            </ValidatorForm>
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