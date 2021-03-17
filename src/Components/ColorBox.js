import React, { Component } from 'react';
import chroma from 'chroma-js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import './ColorBox.css';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    }
    this.updateState = this.updateState.bind(this);
  }

  updateState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  }

  render() {
    let { name, color, id, paletteId, showMoreLink } = this.props;
    let txtColor = chroma(color).luminance() >= 0.3 ? chroma(color).luminance(0) : chroma(color).luminance(1);
    return (
      <CopyToClipboard text={color}
        onCopy={this.updateState}>
        <div className="ColorBox" style={{ background: color, color: txtColor }}>
          <div className={this.state.copied ? "copy-overlay show" : "copy-overlay"} style={{ background: color }}></div>
          <div className={`copy-msg ${this.state.copied ? "show" : ""}`} style={{ color: txtColor }}>
            <h1>Copied</h1>
            <div>{color}</div>
          </div>
          <div className="copy-container" >
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button" style={{ color: txtColor }}>COPY</button>
            {showMoreLink &&
              <Link
                to={`/palette/${paletteId}/${id}`}
                className="see-more"
                onClick={e => e.stopPropagation()}
                style={{ color: txtColor }}>MORE</Link>}
          </div>
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;