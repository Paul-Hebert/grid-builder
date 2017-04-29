import React, { Component } from 'react';

class Select extends Component {
  update(e){
    this.props.handler(this.props.names, e.target.value);
  }
  render() {
    return (
        <select onChange={this.update.bind(this)}>
            {this.props.children}
        </select>
    );
  }
}

export default Select;
