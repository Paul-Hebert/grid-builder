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
        preprocessor: "CSS",
        columns: 12,
        gutter: {
          value:10,
          unit:"px"
        }
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
        <GridForm settings={this.state.form} formHandler={this.formHandler.bind(this)}/>
        <Output settings={this.state.form}/>
        <Footer />
      </div>
    );
  }
}

export default App;
