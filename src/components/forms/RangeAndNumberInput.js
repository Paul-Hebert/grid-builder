import React, { Component } from 'react';
import UnitSelect from './UnitSelect';

class IconInput extends Component {
  constructor(props){
    super();
    this.state ={
        value: props.default
    };
  }
  update(e){
    this.setState({
        value:e.target.value
    });

    this.props.handler(this.props.names, e.target.value);
  }
  render() {
    // TODO: Re-work the logic here. Create component for input with units
    var optionalUnitSelect = "";
    var optionalUnitSelectClass = "";

    if(this.props.hasUnitSelect){
      optionalUnitSelect = <UnitSelect handler={this.props.handler} value={[this.props.names[0],"unit"]}/>
      optionalUnitSelectClass = "has-unit-select"
    }

    return (
        <div className={"range-and-number-input " + optionalUnitSelectClass}>
            <input type="number" 
                   value={this.state.value} 
                   min={this.props.min} 
                   max={this.props.max}
                   step={this.props.step}
                   onChange={this.update.bind(this)}
            />
            {optionalUnitSelect}
            <input type="range" 
                   value={this.state.value} 
                   min={this.props.min} 
                   max={this.props.max}
                   step={this.props.step}
                   onChange={this.update.bind(this)}
            />
        </div>
    );
  }
}

export default IconInput;
