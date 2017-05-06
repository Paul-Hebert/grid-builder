import React, { Component } from 'react';
import Select from './Select';

class UnitSelect extends Component {
  update(e){
    this.props.handler(this.props.names, e.target.value);
  }
  render() {
    return (
        <Select handler={this.props.handler.bind(this)} 
                names={this.props.names} 
                value={this.props.value}
                className="unit-select" 
        >
            <option value="px">px</option>
            <option value="em">em</option>
            <option value="rem">rem</option>
            <option value="vw">vw</option>
            <option value="vh">vh</option>
            <option value="%">%</option>
        </Select>
    );
  }
}

export default UnitSelect;
