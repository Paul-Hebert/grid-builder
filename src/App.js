import React, { Component } from 'react';
import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer.js';
import GridForm from './components/forms/GridForm.js';
import Output from './components/output/Output.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <GridForm />
        <Output />
        <Footer />
      </div>
    );
  }
}

export default App;
