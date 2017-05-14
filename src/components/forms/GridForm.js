import React, { Component } from 'react';
import IconInput from './IconInput';
import Select from './Select';
import RangeAndNumberInput from './RangeAndNumberInput';
import NumberInput from './NumberInput';
import Checkbox from './Checkbox';

class GridForm extends Component {
  constructor(props){
    super();

    this.handler = this.handler.bind(this);
  }

  handler(names, value) {
    var currentState = this.props.settings;

    // TODO: Figure out a better way to drill down object properties using arrays and bracket notation
    if(names.length === 1){
      currentState[names[0]] = value;
    } else if(names.length === 2){
      currentState[names[0]][names[1]] = value;
    }

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
                <RangeAndNumberInput min="2" max="18" step="1" default={this.props.settings.columns} handler={this.handler} names={["columns"]}/>
              </IconInput>
            </label>       
            <label>
              Gutter Width

              <IconInput icon="arrows-h">
                <RangeAndNumberInput 
                  min="0" 
                  max="30" 
                  step="0.01" 
                  default={this.props.settings.gutter.value} 
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
                  default={this.props.settings.rowMargin.value} 
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
              Strategy

              <IconInput icon="lightbulb-o">
                <Select handler={this.handler} names={["strategy"]} value={this.props.settings.strategy}>
                  <option value="floats">Floated</option>
                  <option value="inline-block">Inline Block</option>
                  <option value="flexbox">Flexbox</option>
                  <option value="css-grid">CSS Grid</option>
                </Select>
              </IconInput>
            </label>

            <label>
              Box Sizing

              <IconInput icon="object-group">
                <Select handler={this.handler} names={["boxSizing"]} value={this.props.settings.boxSizing}>
                  <option value="border-box">Border Box</option>
                  <option value="content-box">Content Box</option>
                </Select>
              </IconInput>
            </label>
          </section>

          <section>
            <header>
              <h3>Code Formatting</h3>
            </header>
            <label>
              Indentation

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
