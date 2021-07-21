import React, { Component } from 'react';
import './index.scss';
export default class Layout extends Component {
  render() {
    const { className = '' } = this.props;
    return <div className={`layout ${className}`}>
      {this.props.children}
    </div>;
  }
}
