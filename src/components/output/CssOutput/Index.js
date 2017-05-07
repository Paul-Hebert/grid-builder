import React, {Component} from 'react';
import StyleSheet from "./StyleSheet";
import CssText from "./CssText/Index";
import Declaration from "./CssText/RuleSet/Declaration";
import RuleSet from "./CssText/RuleSet/Index";
import SingleLine from "./CssText/Comments/SingleLine";
import ClosedSingleLine from "./CssText/Comments/ClosedSingleLine";
import MultiLine from "./CssText/Comments/MultiLine";
import Fancy from "./CssText/Comments/Fancy";
import ExtraFancy from "./CssText/Comments/ExtraFancy";
import Indent from "./CssText/Indent";

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
    var fileName = "grid." + fileExtension;

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
    console.log("share");
  }

  copy(){
    console.log("copy");
  }


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // Life Cycle Events
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
        type: "comment",
        style:"closed-single-line",
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

    var tempCssText = [];
    var tempStyleSheetText = '';

    for(i = 0; i < nodes.length; i++){
      if(nodes[i].type === "code"){
        var declarations = [];

        for(var x = 0; x < nodes[i].rules.length; x++){
            tempStyleSheetText += nodes[i].selector + "{" +
            nodes[i].rules[x].name + ":" + nodes[i].rules[x].value + ";}";

            declarations.push(<Declaration name={nodes[i].rules[x].name} value={nodes[i].rules[x].value} indent={props.settings.indent} key={x}/>)
        }

        tempCssText.push(<RuleSet selector={nodes[i].selector} key={i}>{declarations}</RuleSet>);
      } else if(nodes[i].type === "comment"){
        if(nodes[i].style === "single-line"){
          tempCssText.push(<SingleLine key={i}>{nodes[i].rows[0].value}</SingleLine>);
        } else if(nodes[i].style === "closed-single-line"){
          tempCssText.push(<ClosedSingleLine key={i}>{nodes[i].rows[0].value}</ClosedSingleLine>);
        } else if(nodes[i].style === "multi-line"){
          var commentLines = [];

          for(x = 0; x < nodes[i].rows.length; x++){
            commentLines.push(<div className='comment-line' key={x}><Indent number={props.settings.indent.number} type={props.settings.indent.type}/>{nodes[i].rows[x].value}</div>);
          }

          tempCssText.push(<MultiLine key={i}>{commentLines}</MultiLine>);
        } else if(nodes[i].style === "fancy"){
          commentLines = [];

          for(x = 0; x < nodes[i].rows.length; x++){
            commentLines.push(<div className='comment-line' key={x}><Indent number={props.settings.indent.number} type={props.settings.indent.type}/>{nodes[i].rows[x].value}</div>);
          }

          tempCssText.push(<Fancy key={i}>{commentLines}</Fancy>);
        } else if(nodes[i].style === "extra-fancy"){
          commentLines = [];

          for(x = 0; x < nodes[i].rows.length; x++){
            commentLines.push(<div className='comment-line' key={x}><Indent number={props.settings.indent.number} type={props.settings.indent.type}/>{nodes[i].rows[x].value}</div>);
          }

          tempCssText.push(<ExtraFancy key={i}>{commentLines}</ExtraFancy>);
        }
      } else if(nodes[i].type === "space"){
        for(x = 0; x < nodes[i].number; x++){
          tempCssText.push(<div key={i + "-" + x}>&nbsp;</div>)
        }
      }else{
        console.error("Incorrect node type");
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