import React, { Component } from 'react';
import MiniPalette from './MiniPalette.js';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from '../styles/PaletteListstyle.js';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { blue, red } from '@material-ui/core/colors';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeletedialog: false,
      deletingId: ""
    }
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.goToPalette = this.goToPalette.bind(this);
  }

  openDialog(paletteId) {
    this.setState({
      openDeletedialog: true,
      deletingId: paletteId
    })
  }
  closeDialog() {
    this.setState({
      openDeletedialog: false,
      deletingId: ""
    })
  }

  confirmDelete() {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  }

  goToPalette(id) {
    this.props.history.push(`/palette/${id}`)
  }

  render() {

    const { openDeletedialog } = this.state;

    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.container}>
          <div className={this.props.classes.nav}>
            {/* <h1>React Colors</h1> */}
            <Link to="/"><h1>React Colors</h1></Link>
            <Link to="/palette/new">Create Palette</Link>
          </div>
          <TransitionGroup className={this.props.classes.palettes}>
            {this.props.palettes.map(palette => (
              <CSSTransition
                key={palette.id}
                classNames='fade'
                timeout={500}>
                <MiniPalette {...palette}
                  key={palette.id}
                  handleClick={this.goToPalette}
                  deletePalette={this.openDialog} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          // onClose={}
          aria-labelledby="delete-dialog-title"
          open={openDeletedialog}>
          <DialogTitle id="delete-dialog-title">Delete this Palette ?</DialogTitle>
          <List>
            <ListItem button onClick={this.confirmDelete}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Confirm" />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div >
    );
  }
}

export default withStyles(styles)(PaletteList);