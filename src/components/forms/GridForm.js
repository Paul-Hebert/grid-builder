import React, { Component } from 'react';
import IconInput from './IconInput';
import Select from './Select';
import RangeAndNumberInput from './RangeAndNumberInput';
import NumberInput from './NumberInput';
import Checkbox from './Checkbox';

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
        },
        indent: {
          type:props.settings.indent.type,
          number:props.settings.indent.number
        },
        includeComments: props.settings.includeComments,
        minify: props.settings.minify
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
      <section className="grid-form ui-column">
        <header className="ui-column-header">
          <h2>Form</h2>
        </header>

        <form autoComplete="off">
          <section>          
            <header>
              <h3>Columns</h3>
            </header>

            <label> 
              Number of Columns

              <IconInput icon="table">
                <RangeAndNumberInput min="2" max="18" step="1" default={this.state.columns} handler={this.handler} names={["columns"]}/>
              </IconInput>
            </label>       
            <label>
              Gutter Width

              <IconInput icon="arrows-h">
                <RangeAndNumberInput 
                  min="0" 
                  max="30" 
                  step="0.01" 
                  default={this.state.gutter.value} 
                  handler={this.handler} 
                  names={["gutter","value"]}
                  hasUnitSelect="true"
                  unitSelectValue={this.props.settings.gutter.unit}
                />
              </IconInput>
            </label>  

            <label>
              Row's Bottom margin

              <IconInput icon="arrows-v">
                <RangeAndNumberInput 
                  min="0" 
                  max="30" 
                  step="0.01" 
                  default={this.state.rowMargin.value} 
                  handler={this.handler} 
                  names={["rowMargin","value"]}
                  hasUnitSelect="true"
                  unitSelectValue={this.props.settings.rowMargin.unit}
                />
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
                <Select handler={this.handler} names={["preprocessor"]} value={this.props.settings.preprocessor}>
                  <option value="CSS">None</option>
                  <option value="SCSS">SCSS</option>
                  <option value="SASS">SASS</option>
                  <option value="LESS">LESS</option>
                  <option value="Stylus">Stylus</option>
                </Select>
              </IconInput>
            </label>

            <label>
              Code Indentation

              <IconInput icon="indent" extraClass="combo">
                <NumberInput type="number" 
                             min="0" 
                             max="6" 
                             step="1"
                             value={this.props.settings.indent.number} 
                             handler={this.handler} 
                             names={["indent","number"]} 
                />

                <Select handler={this.handler} names={["indent","type"]} value={this.props.settings.indent.type}>
                  <option value="space">Spaces</option>
                  <option value="tab">Tabs</option>
                </Select>
              </IconInput>
            </label>

            <label>
              <Checkbox value={this.props.settings.includeComments}
                        handler={this.handler}
                        names={['includeComments']}
              /> Include Comments
            </label>

            <label>
              <Checkbox value={this.props.settings.minify}
                        handler={this.handler}
                        names={['minify']}
              /> Minify Code
            </label>
          </section>
        </form>
      </section>
    );
  }
}

export default GridForm;
