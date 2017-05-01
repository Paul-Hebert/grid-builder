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
        rowMargin: props.settings.rowMargin,
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
    } else if(names.length === 3){
      currentState[names[0]][names[1]][names[2]] = value;
    }

    this.setState(currentState);

    this.props.formHandler(currentState);
  }

  render() {
    return (
        <form autoComplete="off" className="grid-form">
          <section>          
            <header>
              <h3>Columns</h3>
            </header>

            <label> 
              Number of Columns

              <IconInput icon="align-right" additionalClasses="fa-rotate-270">
                <RangeAndNumberInput min="2" max="18" step="1" default={this.state.columns} handler={this.handler} names={["columns"]}/>
              </IconInput>
            </label>       
            <label>
              Gutter Width

              <IconInput icon="align-right">
                <RangeAndNumberInput min="0" max="30" step="0.01" default={this.state.gutter.value} handler={this.handler} names={["gutter","value"]}/>
                <UnitSelect handler={this.handler} value={this.state.gutter.unit} names={["gutter","unit"]}/>
              </IconInput>
            </label>  

            <label>
              Row's Bottom margin

              <IconInput icon="align-right">
                <RangeAndNumberInput min="0" max="30" step="0.01" default={this.state.rowMargin.value} handler={this.handler} names={["rowMargin","value"]}/>
                <UnitSelect handler={this.handler} value={this.state.rowMargin.unit} names={["rowMargin","unit"]}/>
              </IconInput>
            </label>
          </section>

          <section>
            <header>
              <h3>Technical Choices</h3>
            </header>
            <label>
              Preprocessors

              <IconInput icon="code">
                <Select handler={this.handler} names={["preprocessor"]}>
                  <option value="CSS">None</option>
                  <option value="SCSS">SCSS</option>
                  <option value="SASS">SASS</option>
                  <option value="LESS">LESS</option>
                  <option value="Stylus">Stylus</option>
                </Select>
              </IconInput>
            </label>
          </section>
        </form>
    );
  }
}

export default GridForm;
