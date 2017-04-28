import React, { Component } from 'react';
import IconInput from './IconInput';
import Select from './Select';
import RangeAndNumberInput from './RangeAndNumberInput';

class GridForm extends Component {
  constructor(props){
    super();

    this.state ={
        preprocessor: props.preprocessor,
        columns: props.columns
    };

    this.handler = this.handler.bind(this);
  }

  handler(name,value) {    
    var key = name;
    var val = value;
    var obj  = {};
    obj[key] = val;

    this.setState(obj, ()=>{
      this.props.formHandler(this.state);
    });
  }

  render() {
    return (
        <form autoComplete="off" className="grid-form">
          <label>
            Preprocessors

            <IconInput icon="code">
              <Select handler={this.handler} name="preprocessor">
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
              <RangeAndNumberInput min="2" max="18" default={this.state.columns} handler={this.handler} name="columns"/>
            </IconInput>
          </label>
        </form>
    );
  }
}

export default GridForm;
