import React, { Component } from 'react';
import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer.js';
import GridForm from './components/forms/GridForm.js';
import Output from './components/output/Output.js';

const queryString = require('query-string');

var queryState = queryString.parse(location.search);

class App extends Component {
  queryOrDefault(name, defaultValue){
    if(typeof queryState[name] === "undefined"){
      return defaultValue;
    } else{
      if(queryState[name] === "percent"){
        return "%";
      } else{
        return queryState[name];
      }
    }
  }

  constructor(){
    super();

    this.state = {
      form :{
        preprocessor: this.queryOrDefault("preprocessor","CSS"),
        columns: this.queryOrDefault("columns",12),
        rowMargin: {
          value: this.queryOrDefault("rowMargin_value",10),
          unit: this.queryOrDefault("rowMargin_unit","px")
        },
        gutter: {
          value: this.queryOrDefault("gutter_value",1),
          unit: this.queryOrDefault("gutter_unit","%")
        },
        indent: {
          type: this.queryOrDefault("indent_type","space"),
          number: this.queryOrDefault("indent_number",4)
        },
        includeComments: this.queryOrDefault("includeComments",true),
        minify: this.queryOrDefault("minify",false)
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
