import React, { Component } from 'react';
import Tab from '../Tab';

class Declaration extends Component {
  render() {
    return (
        <div className="declaration">
            <Tab/>
            <span className="name">{this.props.name}</span>
            <span className="colon">:</span>
            &nbsp;
            <span className="value">{this.props.value}</span>
            <span className="semicolon">;</span>
        </div>
    );
  }
}

export default Declaration;
