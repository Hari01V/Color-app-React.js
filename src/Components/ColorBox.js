import React, { Component } from 'react';
import chroma from 'chroma-js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/ColorBoxstyle.js';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    }
    this.updateState = this.updateState.bind(this);
  }

  updateState() {
    this.props.changeColorBoxOverflow(true);
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
        this.props.changeColorBoxOverflow(false)
      }, 1500);
    });
  }

  render() {
    let { classes, name, color, id, paletteId, showMoreLink } = this.props;
    let txtColor = chroma(color).luminance() >= 0.3 ? chroma(color).luminance(0) : chroma(color).luminance(1);
    return (
      <CopyToClipboard text={color}
        onCopy={this.updateState}>
        <div className={classes.ColorBox} style={{ background: color, color: txtColor }}>
          <div className={this.state.copied ? `${classes.copyOverlay} ${classes.copyOverlayShow}` : `${classes.copyOverlay}`} style={{ background: color }}></div>
          <div className={`${classes.copyMsg} ${this.state.copied ? `${classes.copyMsgShow}` : ""}`} style={{ color: txtColor }}>
            <h1>Copied</h1>
            <div>{color}</div>
          </div>
          <div className={classes.copyContainer} >
            <div className={classes.boxContent}>
              <span>{name}</span>
            </div>
            <button className={classes.copyButton} style={{ color: txtColor }}>COPY</button>
            {showMoreLink &&
              <Link
                to={`/palette/${paletteId}/${id}`}
                className={classes.seeMore}
                onClick={e => e.stopPropagation()}
                style={{ color: txtColor }}>MORE</Link>}
          </div>
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);