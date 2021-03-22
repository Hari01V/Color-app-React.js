import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import { mergeClasses } from '@material-ui/styles';

const styles = {
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
};

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newColorName: "",
      pickedColor: "blue"
    }
    this.handlePickerChange = this.handlePickerChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePickerChange(color) {
    this.setState({ pickedColor: color.hex });
  }

  handleNameChange(e) {
    this.setState(st => ({
      [e.target.name]: e.target.value
    }));
  }

  handleSubmit() {
    let newColor = {
      name: this.state.newColorName.toLowerCase(),
      color: this.state.pickedColor
    }
    this.setState({
      newColorName: ""
    });
    this.props.addNewColor(newColor);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => {
      let isMatch = this.props.colors.find(color => color.name === value.toLowerCase());
      if (!isMatch) {
        return true;
      } else {
        return false;
      }
    });
    ValidatorForm.addValidationRule('isColorUnique', (value) => {
      let isMatch = this.props.colors.find(color => color.color === this.state.pickedColor);
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
  }

  render() {
    const { classes, isPaletteFull } = this.props;
    const { pickedColor, newColorName } = this.state;

    return (
      <div className={classes.root}>
        <ChromePicker
          color={pickedColor}
          onChange={this.handlePickerChange}
          onChangeComplete={this.handlePickerChange}
          className={classes.picker} />
        <ValidatorForm
          onSubmit={this.handleSubmit}
          className={classes.form}>
          <TextValidator
            label="Color Name"
            onChange={this.handleNameChange}
            name="newColorName"
            type="text"
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['this field is required', 'Color Name should be unique!', 'Color already exists!']}
            value={newColorName}
            style={{ background: "rgba(0, 0, 0, 0.09)", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} />
          <Button
            type="submit"
            variant="contained"
            size="large"
            style={{ background: isPaletteFull ? "grey" : pickedColor }}
            disabled={isPaletteFull}>{isPaletteFull ? "Palette Full" : "Add Color"}</Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);