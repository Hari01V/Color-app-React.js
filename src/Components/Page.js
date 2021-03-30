import React, { Component } from 'react';
import '../styles/Page.css';

class Page extends Component {
  render() {
    const slideClass = this.props.history.action;
    return (
      <section className={`page ${(slideClass === "POP") ? "reverse" : ""}`}>{this.props.children}</section>
    );
  }
}

export default Page;