import React, { Component } from 'react';
import IconInput from './components/IconInput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <IconInput icon="search">
          <input type="text" />
        </IconInput>
        <IconInput icon="cog">
          <select>
            <option>Test</option>
          </select>
        </IconInput>
      </div>
    );
  }
}

export default App;
