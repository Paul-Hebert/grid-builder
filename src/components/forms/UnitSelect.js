import React, { Component } from 'react';
import Select from './Select';

class UnitSelect extends Component {
  update(e){
    this.props.handler(this.props.names, e.target.value);
  }
  render() {
    return (
        <Select handler={this.props.handler.bind(this)} names={this.props.names}>
            <option>px</option>
            <option>%</option>
        </Select>
    );
  }
}

export default UnitSelect;
