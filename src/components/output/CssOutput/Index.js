import React, { Component } from 'react';
import StyleSheet from "./StyleSheet";
import CssText from "./CssText";

class CssOutput extends Component {
  render() {
    var nodes = [
      {
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
        selector: "[class^='col-'], div[class*=' col-']",
        rules: [
          {
            name: "width",
            value: (100/this.props.columns) + "%"
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
            value: "0 " + this.props.gutter.value + this.props.gutter.unit
          }
        ]
      }
    ];

    for(var i = 1; i <= this.props.columns; i++){
      nodes.push({
        selector: ".col-" + i,
        rules: [
          {
            name: "width",
            value: (100 / this.props.columns * i) + "%"
          }
        ]
      });
    }

    var ruleText = '';

    for(i = 0; i < nodes.length; i++){
        ruleText += nodes[i].selector + "{";
        
        for(var x = 0; x < nodes[i].rules.length; x++){
            ruleText += nodes[i].rules[x].name + ":" + nodes[i].rules[x].value + ";";
        }

        ruleText += "}";
    }

    return (
      <div className="css-output">
        <StyleSheet>{ruleText}</StyleSheet>
        <CssText>{ruleText}</CssText>
      </div>
    )
  }
}

export default CssOutput;
