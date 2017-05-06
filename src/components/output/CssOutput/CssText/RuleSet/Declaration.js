import React, { Component } from 'react';
import Indent from '../Indent';

class Declaration extends Component {
  render() {
    return (
        <div className="declaration">
            <Indent number={this.props.indent.number} type={this.props.indent.type}/>
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
