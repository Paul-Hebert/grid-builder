import React, { Component } from 'react';
import StyleSheet from "./StyleSheet";
import CssText from "./CssText";

class CssOutput extends Component {
  render() {
    var nodes = [
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
          }
        ]
      }
    ];

    var ruleText = '';

    for(var i = 0; i < nodes.length; i++){
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
