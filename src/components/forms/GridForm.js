import React, { Component } from 'react';
import IconInput from './IconInput';
import RangeAndNumberInput from './RangeAndNumberInput';

class GridForm extends Component {
  render() {
    return (
        <form autoComplete="off" className="grid-form">
          <label>
            Preprocessors
            <IconInput icon="code">
              <select>
                <option value="None">None</option>
                <option value="SCSS">SCSS</option>
                <option value="SASS">SASS</option>
                <option value="LESS">LESS</option>
                <option value="Stylus">Stylus</option>
              </select>
            </IconInput>
          </label>

          <IconInput icon="arrow-right">
            <input type="button" value="Go!"/>
          </IconInput>

          <IconInput icon="cog">
            <input type="text" />
          </IconInput>


          <IconInput icon="cog">
            <RangeAndNumberInput min="0" max="100"/>
          </IconInput>

          <IconInput icon="cog">
            <textarea></textarea>
          </IconInput>
        </form>
    );
  }
}

export default GridForm;
