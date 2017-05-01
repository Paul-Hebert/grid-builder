import React, { Component } from 'react';
import StyleSheet from "./StyleSheet";
import CssText from "./CssText/Index";
import Declaration from "./CssText/RuleSet/Declaration";
import RuleSet from "./CssText/RuleSet/Index";
import SingleLine from "./CssText/Comments/SingleLine";
import ClosedSingleLine from "./CssText/Comments/ClosedSingleLine";
import MultiLine from "./CssText/Comments/MultiLine";
import Fancy from "./CssText/Comments/Fancy";
import ExtraFancy from "./CssText/Comments/ExtraFancy";
import Tab from "./CssText/Tab";

class CssOutput extends Component {
  render() {
    var nodes = [
      {
        type: "comment",
        style:"extra-fancy",
        rows:[
          {
            value: "Custom Grid"
          }
        ]
      },
      {
        type: "space",
        number: 1
      },
      {
        type: "comment",
        style:"fancy",
        rows:[
          {
            value: "Rows"
          }
        ]
      },
      {
        type: "space",
        number: 1
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
            value: this.props.settings.rowMargin.value + this.props.settings.rowMargin.unit
          }
        ]
      },
      {
        type: "space",
        number: 1
      },
      {
        type: "comment",
        style:"closed-single-line",
        rows:[
          {
            value: "Clearfix"
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
        type: "space",
        number: 1
      },
      {
        type: "comment",
        style:"fancy",
        rows:[
          {
            value: "Columns"
          }
        ]
      },
      {
        type: "space",
        number: 1
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

      nodes.push({
        type: "space",
        number: 1
      });
    }

    var styleSheetText = '';
    var cssText = [];

    for(i = 0; i < nodes.length; i++){
      if(nodes[i].type === "code"){
        var declarations = [];

        for(var x = 0; x < nodes[i].rules.length; x++){
            styleSheetText += nodes[i].selector + "{" +
            nodes[i].rules[x].name + ":" + nodes[i].rules[x].value + ";}";

            declarations.push(<Declaration name={nodes[i].rules[x].name} value={nodes[i].rules[x].value} key={x}/>)
        }

        cssText.push(<RuleSet selector={nodes[i].selector} key={i}>{declarations}</RuleSet>);
      } else if(nodes[i].type === "comment"){
        if(nodes[i].style === "single-line"){
          cssText.push(<SingleLine key={i}>{nodes[i].rows[0].value}</SingleLine>);
        } else if(nodes[i].style === "closed-single-line"){
          cssText.push(<ClosedSingleLine key={i}>{nodes[i].rows[0].value}</ClosedSingleLine>);
        } else if(nodes[i].style === "multi-line"){
          var commentLines = [];

          for(x = 0; x < nodes[i].rows.length; x++){
            commentLines.push(<div className='comment-line' key={x}><Tab/>{nodes[i].rows[x].value}</div>);
          }

          cssText.push(<MultiLine key={i}>{commentLines}</MultiLine>);
        } else if(nodes[i].style === "fancy"){
          commentLines = [];

          for(x = 0; x < nodes[i].rows.length; x++){
            commentLines.push(<div className='comment-line' key={x}><Tab/>{nodes[i].rows[x].value}</div>);
          }

          cssText.push(<Fancy key={i}>{commentLines}</Fancy>);
        } else if(nodes[i].style === "extra-fancy"){
          commentLines = [];

          for(x = 0; x < nodes[i].rows.length; x++){
            commentLines.push(<div className='comment-line' key={x}><Tab/>{nodes[i].rows[x].value}</div>);
          }

          cssText.push(<ExtraFancy key={i}>{commentLines}</ExtraFancy>);
        }
      } else if(nodes[i].type === "space"){
        for(x = 0; x < nodes[i].number; x++){
          cssText.push(<div key={i + "-" + x}>&nbsp;</div>)
        }
      }else{
        console.error("Incorrect node type");
      }
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