import React, { Component } from 'react';
import StyleSheet from "./StyleSheet";
import CssText from "./CssText";

class CssOutput extends Component {
  render() {
    var nodes = [
      {
        type: "comment",
        style:"single-line",
        rows:{
          value: "Custom CSS Grid"
        }
      },
      {
        type: "code",
        selector: ".row",
        rules: [
          {
            name:"width",
            value: "100%"
          },
          {
            name:"margin-bottom",
            value:"5px"
          }
        ]
      },
      {
        type: "code",
        selector: ".row::after",
        rules: [
          {
            name: "content",
            value: "''"
          },
          {
            name: "display",
            value: "table"
          },
          {
            name: "clear",
            value: "both"
          }
        ]
      },
      {
        type: "code",
        selector: "[class^='col-'], div[class*=' col-']",
        rules: [
          {
            name: "width",
            value: (100/this.props.settings.columns) + "%"
          },
          {
            name: "float",
            value: "left"
          },
          {
            name: "box-sizing",
            value: "border-box"
          },
          {
            name: "padding",
            value: "0 " + this.props.settings.gutter.value + this.props.settings.gutter.unit
          }
        ]
      }
    ];

    for(var i = 1; i <= this.props.settings.columns; i++){
      nodes.push({
        type: "code",
        selector: ".col-" + i,
        rules: [
          {
            name: "width",
            value: (100 / this.props.settings.columns * i) + "%"
          }
        ]
      });
    }

    var ruleText = '';

    for(i = 0; i < nodes.length; i++){
      if(nodes[i].type === "code"){
        ruleText += nodes[i].selector + "{";
        
        for(var x = 0; x < nodes[i].rules.length; x++){
            ruleText += nodes[i].rules[x].name + ":" + nodes[i].rules[x].value + ";";
        }

        ruleText += "}";
      } else if(nodes[i].type === "comment"){
        if(nodes[i].style === "single-line"){
          ruleText += "/*" + nodes[i].rows.value + "*/";
        }
      } else{
        console.log("Incorrect node type");
      }
    }

    return (
      <div>
        <StyleSheet>{ruleText}</StyleSheet>
        <CssText preprocessor={this.props.settings.preprocessor}>{ruleText}</CssText>
      </div>
    )
  }
}

export default CssOutput;