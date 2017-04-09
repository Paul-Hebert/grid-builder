import React, { Component } from 'react';
import IconInput from './IconInput';
import RangeAndNumberInput from './RangeAndNumberInput';

class GridForm extends Component {
  render() {
    return (
        <form autoComplete="off">
          <IconInput icon="search">
            <input type="text" />
          </IconInput>

          <IconInput icon="arrow-right">
            <input type="button" value="Go!"/>
          </IconInput>

          <IconInput icon="cog">
            <select>
              <option>Test</option>
            </select>
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
