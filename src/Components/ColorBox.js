import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
    const { id, name, hex, hexNoHash, rgb, rgba } = this.props;
    return (
      <CopyToClipboard text={hex}
        onCopy={this.updateState}>
        <div className="ColorBox" style={{ background: hex }}>
          <div className={this.state.copied ? "copy-overlay show" : "copy-overlay"} style={{ background: hex }}></div>
          <div className={`copy-msg ${this.state.copied ? "show" : ""}`}>
            <h1>Copied</h1>
            <div>{hex}</div>
          </div>
          <div className="copy-container" >
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">COPY</button>
            <span className="see-more">MORE</span>
          </div>
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;