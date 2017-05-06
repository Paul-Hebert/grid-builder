import React, { Component } from 'react';

class NumberInput extends Component {
  update(e){
    this.props.handler(this.props.names, e.target.value);
  }
  render() {
    return (
        <input type="number"
               onChange={this.update.bind(this)} 
               className={this.props.className}
               min={this.props.min}
               max={this.props.max}
               value={this.props.value}
               step={this.props.stp}
        />
    );
  }
}

export default NumberInput;
