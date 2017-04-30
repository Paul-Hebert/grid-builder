import React, { Component } from 'react';

class Declaration extends Component {
  render() {
    return (
        <div className="declaration">
            <span className="name">{this.props.name}</span>
            <span className="colon">:</span>
            <span className="value">{this.props.value}</span>
            <span className="semicolon">;</span>
        </div>
    );
  }
}

export default Declaration;
