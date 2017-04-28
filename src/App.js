import React, { Component } from 'react';
import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer.js';
import GridForm from './components/forms/GridForm.js';
import Output from './components/output/Output.js';

class App extends Component {
  constructor(){
    super();

    this.state = {
      form :{
        preprocessor: "none",
        columns: 12
      }
    }
  }

  formHandler(formState){
    this.setState({
      form: formState
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <GridForm preprocessor={this.state.form.preprocessor} columns={this.state.form.columns} formHandler={this.formHandler.bind(this)}/>
        <Output />
        <Footer />
      </div>
    );
  }
}

export default App;
