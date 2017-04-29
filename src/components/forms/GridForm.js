import React, { Component } from 'react';
import IconInput from './IconInput';
import Select from './Select';
import UnitSelect from './UnitSelect';
import RangeAndNumberInput from './RangeAndNumberInput';

class GridForm extends Component {
  constructor(props){
    super();

    this.state ={
        preprocessor: props.settings.preprocessor,
        columns: props.settings.columns,
        gutter: {
          value: props.settings.gutter.value,
          unit: props.settings.gutter.unit
        }
    };

    this.handler = this.handler.bind(this);
  }

  handler(names, value) {
    var currentState = this.state;

    // TODO: Figure out a better way to drill down object properties using arrays and bracket notation
    if(names.length === 1){
      currentState[names[0]] = value;
    } else if(names.length === 2){
      currentState[names[0]][names[1]] = value;
    }

    this.setState(currentState);

    this.props.formHandler(currentState);
  }

  render() {
    return (
        <form autoComplete="off" className="grid-form">
          <label>
            Preprocessors

            <IconInput icon="code">
              <Select handler={this.handler} names={["preprocessor"]}>
                <option value="None">None</option>
                <option value="SCSS">SCSS</option>
                <option value="SASS">SASS</option>
                <option value="LESS">LESS</option>
                <option value="Stylus">Stylus</option>
              </Select>
            </IconInput>
          </label>
          
          <label>
            Columns

            <IconInput icon="align-right" additionalClasses="fa-rotate-270">
              <RangeAndNumberInput min="2" max="18" default={this.state.columns} handler={this.handler} names={["columns"]}/>
            </IconInput>
          </label>
          
          <label>
            Gutters

            <IconInput icon="align-right">
              <RangeAndNumberInput min="0" max="100" default={this.state.gutter.value} handler={this.handler} names={["gutter","value"]}/>
              <UnitSelect handler={this.handler} value={this.state.gutter.unit} names={["gutter","unit"]}/>
            </IconInput>
          </label>
        </form>
    );
  }
}

export default GridForm;
