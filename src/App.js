import React, { Component } from 'react';
import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer.js';
import GridForm from './components/forms/GridForm.js';
import Output from './components/output/Output.js';

const queryString = require('query-string');

var queryState = queryString.parse(location.search);


function queryOrDefault(name, defaultValue){
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

class App extends Component {
  constructor(){
    super();

    this.state = {
      form :{
        preprocessor: queryOrDefault("preprocessor","CSS"),
        columns: queryOrDefault("columns",12),
        rowMargin: {
          value:queryOrDefault("rowMargin.value",10),
          unit:queryOrDefault("rowMargin.unit","px")
        },
        gutter: {
          value:queryOrDefault("gutter.value",1),
          unit:queryOrDefault("gutter.unit","%")
        },
        indent: {
          type:queryOrDefault("indent.type","space"),
          number:queryOrDefault("indent.number",4)
        },
        includeComments: queryOrDefault("includeComments",true),
        minify: queryOrDefault("minify",false)
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
