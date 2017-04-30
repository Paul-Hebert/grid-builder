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

    var styleSheetText = '';
    var cssText = '';

    {/* TODO: Convert the cssText section to React JSX instead of HTML string */}
    for(i = 0; i < nodes.length; i++){
      if(nodes[i].type === "code"){
        styleSheetText += nodes[i].selector + "{";
        cssText += "<div><span class='selector'>" + nodes[i].selector + "</span><span class='bracket'>{</span></div>";
        
        for(var x = 0; x < nodes[i].rules.length; x++){
            styleSheetText += nodes[i].rules[x].name + ":" + nodes[i].rules[x].value + ";";
            cssText += "<div class='declaration'><span class='name'>" + nodes[i].rules[x].name + "</span><span class='colon'>:</span><span class='value'>" + nodes[i].rules[x].value + "</span><span class='semicolon'>;</span></div>";
        }

        styleSheetText += "}";
        cssText += "<div class='bracket'>" + "}" + "</div>";
      } else if(nodes[i].type === "comment"){
        if(nodes[i].style === "single-line"){
          styleSheetText += "/*" + nodes[i].rows.value + "*/";
          cssText += "<div class='comment'>" + "/*" + nodes[i].rows.value + "*/" + "</div>";
        }
      } else{
        console.log("Incorrect node type");
      }

      cssText += "<div>&nbsp;</div>";
    }

    return (
      <div>
        <StyleSheet>{styleSheetText}</StyleSheet>
        <CssText preprocessor={this.props.settings.preprocessor}>{cssText}</CssText>
      </div>
    )
  }
}

export default CssOutput;