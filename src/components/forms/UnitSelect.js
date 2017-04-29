import React, { Component } from 'react';
import Select from './Select';

class UnitSelect extends Component {
  render() {
    return (
        <Select>
            <option>px</option>
            <option>%</option>
        </Select>
    );
  }
}

export default UnitSelect;
