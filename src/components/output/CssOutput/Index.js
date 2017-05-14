import React, {Component} from 'react';
import StyleSheet from "./StyleSheet";
import CssText from "./CssText/Index";
import Declaration from "./CssText/RuleSet/Declaration";
import RuleSet from "./CssText/RuleSet/Index";
import SingleLine from "./CssText/Comments/SingleLine";
import MultiLine from "./CssText/Comments/MultiLine";
import Fancy from "./CssText/Comments/Fancy";
import ExtraFancy from "./CssText/Comments/ExtraFancy";
import Indent from "./CssText/Indent";

const queryString = require('query-string');

class CssOutput extends Component {
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // Constructor
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  constructor(props){
    super();

    var cssState = this.buildCss(props);

    this.state = {
        styleSheetText: cssState.styleSheetText,
        cssText: cssState.cssText
    };
  }


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // Action Button Functions
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  download(){
    // Cross browser client side download. IE 10+
    // http://stackoverflow.com/a/33542499/7816145
    var fileExtension = this.props.settings.preprocessor.toLowerCase();
    var fileName = "grid." + (this.props.settings.minify ? "min." : "") + fileExtension;

    if(fileExtension !== "css"){
      fileName = "_" + fileName;
    }


    var blob = new Blob([this.state.styleSheetText], {type: 'text/' + fileExtension});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, fileName);
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = fileName;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
  }

  share(){
    console.log(window.location.origin + "/?" + queryString.stringify(this.flattenObject(this.props.settings)));
  }

  flattenObject(oldObject){
    var newObject = {};

    for(var property in oldObject){
      if (typeof oldObject[property] === "object") {
          for(var nestedProperty in oldObject[property]){
            newObject[property + "_" + nestedProperty] = this.encodePercent(oldObject[property][nestedProperty]);
          }
      } else{
        newObject[property] = this.encodePercent(oldObject[property]);
      }
    }

    return newObject;
  }

  encodePercent(value){
    if(value === "%"){
      return "percent"
    } else{
      return value;
    }
  }

  copy(){
    console.log("copy");
  }


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // componentWillReceiveProps
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  componentWillReceiveProps(props){
    var newState = this.buildCss(props)

    this.setState({
      styleSheetText: newState.styleSheetText,
      cssText: newState.cssText
    });
  }


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // Css Building
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  buildCss(props){
    var nodes = this.buildCssNodes(props);

    var processedCssNodes = this.processCssNodes(nodes,props);

    return({
      cssText: processedCssNodes.cssText,
      styleSheetText: processedCssNodes.styleSheetText
    });
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  buildCssNodes(props){
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
            value: props.settings.rowMargin.value + props.settings.rowMargin.unit
          }
        ]
      },
      {
        type: "space",
        number: 1
      },
      {
        type: "comment",
        style:"single-line",
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
        type: "comment",
        style:"single-line",
        rows:[
          {
            value: "Selects all classes beginning with 'col-'"
          }
        ]
      },
      {
        type: "code",
        selector: "[class^='col-'], div[class*=' col-']",
        rules: [
          {
            name: "width",
            value: (100/props.settings.columns) + "%"
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
            value: "0 " + props.settings.gutter.value + props.settings.gutter.unit
          }
        ]
      },
      {
        type: "space",
        number: 1
      }
    ];

    for(var i = 1; i <= props.settings.columns; i++){
      nodes.push({
        type: "code",
        selector: ".col-" + i,
        rules: [
          {
            name: "width",
            value: (100 / props.settings.columns * i) + "%"
          }
        ]
      });

      nodes.push({
        type: "space",
        number: 1
      });
    }

    return nodes;
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  processCssNodes(nodes,props){
    var tempCssText = [];
    var tempStyleSheetText = '';

    var styleSheetIndent = '';
    for(var i = 0; i < props.settings.indent.number; i++){
      if(props.settings.indent.type === 'tab'){
        styleSheetIndent += "\t";
      } else{
        styleSheetIndent += " ";
      }
    }

    var newLine = "\n";

    if(props.settings.minify){
      newLine = "";
      styleSheetIndent = "";
    }

    for(i = 0; i < nodes.length; i++){
      if(nodes[i].type === "code"){
        var declarations = [];

        tempStyleSheetText += nodes[i].selector + "{" + newLine

        for(var x = 0; x < nodes[i].rules.length; x++){
            tempStyleSheetText += styleSheetIndent + nodes[i].rules[x].name + ":" + nodes[i].rules[x].value + ";" + newLine;

            declarations.push(<Declaration name={nodes[i].rules[x].name} value={nodes[i].rules[x].value} indent={props.settings.indent} key={x}/>)
        }

        tempStyleSheetText += "}" + newLine;

        tempCssText.push(<RuleSet selector={nodes[i].selector} key={i}>{declarations}</RuleSet>);
      } else if(nodes[i].type === "comment" && props.settings.includeComments){
        if(nodes[i].style === "single-line"){
          tempCssText.push(<SingleLine key={i}>{nodes[i].rows[0].value}</SingleLine>);

          if(props.settings.minify){
            tempStyleSheetText += "/*" + nodes[i].rows[0].value + "*/" + newLine;
          } else{
            tempStyleSheetText += "/* " + nodes[i].rows[0].value + " */" + newLine;
          }
        } else if(nodes[i].style === "multi-line"){
          var commentLines = [];

          tempStyleSheetText += "/*" + newLine;  

          for(x = 0; x < nodes[i].rows.length; x++){
            commentLines.push(<div className='comment-line' key={x}><Indent number={props.settings.indent.number} type={props.settings.indent.type}/>{nodes[i].rows[x].value}</div>);

            tempStyleSheetText += styleSheetIndent + nodes[i].rows[x].value + newLine;  
          }

          tempStyleSheetText += "*/" + newLine;  

          tempCssText.push(<MultiLine key={i}>{commentLines}</MultiLine>);
        } else if(nodes[i].style === "fancy"){
          commentLines = [];

          if(props.settings.minify){
            tempStyleSheetText += "/*";
          } else{
            tempStyleSheetText += "/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + newLine;
          }

          for(x = 0; x < nodes[i].rows.length; x++){
            commentLines.push(<div className='comment-line' key={x}><Indent number={props.settings.indent.number} type={props.settings.indent.type}/>{nodes[i].rows[x].value}</div>);
          
            tempStyleSheetText += styleSheetIndent + nodes[i].rows[x].value + newLine;
          }

          if(props.settings.minify){
            tempStyleSheetText += "*/";
          } else{
            tempStyleSheetText += "/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/" + newLine;
          }

          tempCssText.push(<Fancy key={i}>{commentLines}</Fancy>);
        } else if(nodes[i].style === "extra-fancy"){
          commentLines = [];

          if(props.settings.minify){
            tempStyleSheetText += "/*";
          } else{
            tempStyleSheetText += "/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + newLine;
            tempStyleSheetText += "/*----------------------------------------------" + newLine;
          }

          for(x = 0; x < nodes[i].rows.length; x++){
            commentLines.push(<div className='comment-line' key={x}><Indent number={props.settings.indent.number} type={props.settings.indent.type}/>{nodes[i].rows[x].value}</div>);
            tempStyleSheetText += styleSheetIndent + nodes[i].rows[x].value + newLine;
          }

          if(props.settings.minify){
            tempStyleSheetText += "*/" + newLine;
          } else{
            tempStyleSheetText += "/*----------------------------------------------" + newLine;
            tempStyleSheetText += "/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/" + newLine;
          }


          tempCssText.push(<ExtraFancy key={i}>{commentLines}</ExtraFancy>);
        }
      } else if(nodes[i].type === "space"){
        for(x = 0; x < nodes[i].number; x++){
          tempCssText.push(<div key={i + "-" + x} className="space">&nbsp;</div>);
          tempStyleSheetText += newLine;
        }
      }
    }

    return({
      cssText: tempCssText,
      styleSheetText: tempStyleSheetText
    });
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // Render
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  render(){
    return (
      <div>
        <StyleSheet>{this.state.styleSheetText}</StyleSheet>
        <CssText preprocessor={this.props.settings.preprocessor}
                 minify={this.props.settings.minify}
                 downloadHandler={this.download.bind(this)}
                 shareHandler={this.share.bind(this)}
                 copyHandler={this.copy.bind(this)}
        >
          {this.state.cssText}
        </CssText>
      </div>
    )
  }
}

export default CssOutput;