import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { Divider } from '@material-ui/core';

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      stage: "",
      newPaletteName: ""
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleClickOpen() {
    this.setState({
      open: true,
      stage: "form"
    });
  }

  handleClose() {
    this.setState({
      open: false,
      stage: ""
    });
  }

  handleNameChange(e) {
    this.setState(st => ({
      [e.target.name]: e.target.value
    }));
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => {
      let isMatch = this.props.palettes.find(palette => palette.paletteName.toLowerCase() === value.toLowerCase());
      if (!isMatch) {
        return true;
      } else {
        return false;
      }
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPaletteNameUnique');
  }

  render() {
    const { open, stage, newPaletteName } = this.state;
    const { submitPalette } = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Save Palette
        </Button>
        <Dialog
          open={stage === "emoji" ? true : false}
          onClose={() => (this.setState({ stage: "form" }))}>
          <DialogTitle id="form-dialog-title">Choose A Palette Emoji</DialogTitle>
          <Divider />
          <Picker
            onSelect={(emoji) => submitPalette(newPaletteName, emoji)}
            title="Pick a Palette Emoji" />
        </Dialog>
        <Dialog
          open={stage === "form" ? true : false}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
          <ValidatorForm
            onSubmit={() => (this.setState({ stage: "emoji" }))}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beautiful palette. Make sure it's unique!
              </DialogContentText>
              <TextValidator
                autoFocus
                label="Palette Name"
                onChange={this.handleNameChange}
                name="newPaletteName"
                type="text"
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['this field is required', 'Palette Name should be Unique!']}
                value={newPaletteName}
                style={{ width: "100%", background: "rgba(0, 0, 0, 0.09)", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }} />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary">Save Palette</Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;