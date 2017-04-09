import React, { Component } from 'react';
import IconInput from './components/IconInput';
import RangeAndNumberInput from './components/RangeAndNumberInput';

class App extends Component {
  render() {
    return (
      <div className="App">
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
      </div>
    );
  }
}

export default App;
