import React, {Component} from 'react';
import AppliedCss from "./AppliedCss";
import DisplayedCss from "./DisplayedCss/Index";
import Declaration from "./DisplayedCss/RuleSet/Declaration";
import RuleSet from "./DisplayedCss/RuleSet/Index";
import SingleLine from "./DisplayedCss/Comments/SingleLine";
import MultiLine from "./DisplayedCss/Comments/MultiLine";
import Fancy from "./DisplayedCss/Comments/Fancy";
import ExtraFancy from "./DisplayedCss/Comments/ExtraFancy";
import Indent from "./DisplayedCss/Indent";
import Loop from "./DisplayedCss/Loop";

const queryString = require('query-string');

class CssOutput extends Component {
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // Constructor
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  constructor(props){
    super();

    var cssState = this.buildCss(props);

    this.state = {
        appliedCss: cssState.appliedCss,
        displayedCss: cssState.displayedCss,
        downloadedCss: cssState.downloadedCss
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


    var blob = new Blob([this.state.downloadedCss], {type: 'text/' + fileExtension});
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
      appliedCss: newState.appliedCss,
      displayedCss: newState.displayedCss
    });
  }


  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // Css Building
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  buildCss(props){
    var nodes = this.buildCssNodes(props);

    var processedCssNodes = this.processCssNodes(nodes,props);

    return({
      displayedCss: processedCssNodes.displayedCss,
      appliedCss: processedCssNodes.appliedCss,
      downloadedCss: processedCssNodes.downloadedCss
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
        type: "comment",
        style:"fancy",
        rows:[
          {
            value: "Rows"
          }
        ]
      }
    ];

    if(props.settings.strategy === "inline-block"){
      nodes.push({
        type: "rule-set",
        selector: ".row",
        rules: [
          {
            name:"font-size",
            value: 0
          },
          {
            name:"margin-bottom",
            value: props.settings.rowMargin.value + props.settings.rowMargin.unit
          }
        ]
      });
    } else if(props.settings.strategy === "flexbox"){
       nodes.push({
        type: "rule-set",
        selector: ".row",
        rules: [
          {
            name:"margin-bottom",
            value: props.settings.rowMargin.value + props.settings.rowMargin.unit
          },
          {
            name: "display",
            value: "flex"
          },
          {
            name: "flex",
            value: "0 1 auto"
          },
          {
            name: "flex-direction",
            value: "row"
          },
          {
            name: "flex-wrap",
            value: "wrap"
          }
        ]
      });     
    } else if(props.settings.strategy === "floats"){
      nodes.push({
        type: "rule-set",
        selector: ".row",
        rules: [
          {
            name:"margin-bottom",
            value: props.settings.rowMargin.value + props.settings.rowMargin.unit
          }
        ]
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
      type: "rule-set",
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
    });
    } else if(props.settings.strategy === "css-grid"){
      nodes.push({
        type: "rule-set",
        selector: ".row",
        rules: [
          {
            name:"margin-bottom",
            value: props.settings.rowMargin.value + props.settings.rowMargin.unit
          },
          {
            name:"display",
            value: "grid"
          },
        ]
      });
    }

    nodes.push(
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
      type: "comment",
      style:"single-line",
      rows:[
        {
          value: "Selects all classes beginning with 'col-'"
        }
      ]
    });

    if(props.settings.strategy === "floats"){
      nodes.push({
        type: "rule-set",
        selector: "[class^='col-'], [class*=' col-']",
        rules: [
          {
            name: "float",
            value: "left"
          },
          {
            name: "box-sizing",
            value: props.settings.boxSizing
          },
          {
            name: "padding",
            value: "0 " + props.settings.gutter.value + props.settings.gutter.unit
          }
        ]
      });
    } else if(props.settings.strategy === "flexbox"){
      nodes.push({
        type: "rule-set",
        selector: "[class^='col-'], div[class*=' col-']",
        rules: [
          {
            name: "flex",
            value: "0 0 auto"
          },
          {
            name: "box-sizing",
            value: props.settings.boxSizing
          },
          {
            name: "padding",
            value: "0 " + props.settings.gutter.value + props.settings.gutter.unit
          }
        ]
      });      
    } else if(props.settings.strategy === "inline-block"){
      nodes.push({
        type: "rule-set",
        selector: "[class^='col-'], div[class*=' col-']",
        rules: [
          {
            name: "display",
            value: "inline-block"
          },
          {
            name: "font-size",
            value: "1rem"
          },
          {
            name: "box-sizing",
            value: props.settings.boxSizing
          },
          {
            name: "padding",
            value: "0 " + props.settings.gutter.value + props.settings.gutter.unit
          }
        ]
      });
    }

    var widthName = "width";
    var dynamicValue = 100 / props.settings.columns;
    var dynamicTemplate = "{dynamicValue}{dynamicUnit}";
    var dynamicModifier = 0;

    if(props.settings.boxSizing === "content-box"){
      if(props.settings.gutter.unit === "%"){
        dynamicModifier = (props.settings.gutter.value * -2);
      } else{
        dynamicTemplate = "calc({dynamicValue}{dynamicUnit} - " + (props.settings.gutter.value * 2) + props.settings.gutter.unit + ")";
      }
    }

    if(props.settings.strategy === "flexbox"){
      widthName = "flex-basis";
    }

    nodes.push({
      type: "loop",
      start: 1,
      end: props.settings.columns,
      dynamicValue: dynamicValue,
      dynamicModifier: dynamicModifier,
      dynamicTemplate: dynamicTemplate,
      dynamicUnit: "%",
      childNode: {
        type: "rule-set",
        selector: ".col-{index}",
        rules: [
          {
            name: widthName,
          }
        ]
      }
    });

    return nodes;
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  processCssNodes(nodes,props){
    var tempDisplayedCss = [];
    var tempAppliedCss = '';
    var tempDownloadedCss = '';

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
      tempAppliedCss += this.processNodeForAppliedCss(nodes[i], props);
      tempDownloadedCss += this.processNodeForDownloadedCss(nodes[i], newLine, styleSheetIndent, props);
      tempDisplayedCss.push(this.processNodeForDisplayedCss(nodes[i], props, i));
    }

    return({
      displayedCss: tempDisplayedCss,
      appliedCss: tempAppliedCss,
      downloadedCss: tempDownloadedCss
    });
  }

  processNodeForAppliedCss(node, props){
    var tempAppliedCss = "";
    if(node.type === "rule-set"){
      tempAppliedCss += node.selector + "{";

      for(var x = 0; x < node.rules.length; x++){
          tempAppliedCss += node.rules[x].name + ":" + node.rules[x].value + ";";
      }

      tempAppliedCss += "}";
    } else if(node.type === "loop"){
      for(var z = node.start; z <= node.end; z++){
        var childNode = this.copyObject(node.childNode);

        var dynamicValue = node.dynamicValue * z + node.dynamicModifier;

        childNode.selector = node.childNode.selector.replace("{index}", z)

        childNode.rules = [];

        for(var y = 0; y < node.childNode.rules.length; y++){
          childNode.rules.push({
            name: node.childNode.rules[y].name,
            value: node.dynamicTemplate.replace("{dynamicValue}", dynamicValue).replace("{dynamicUnit}", node.dynamicUnit)
          });
        }

        tempAppliedCss += this.processNodeForAppliedCss(childNode, props);
      }
    }

    return tempAppliedCss;
  }

processNodeForDownloadedCss(node, newLine, styleSheetIndent, props, index){
    var tempDownloadedCss = "";
    if(node.type === "rule-set"){
      tempDownloadedCss += node.selector + "{" + newLine

      for(var x = 0; x < node.rules.length; x++){
          tempDownloadedCss += styleSheetIndent + node.rules[x].name + ":" + node.rules[x].value + ";" + newLine;
      }

      tempDownloadedCss += "}" + newLine + newLine;
    } else if(node.type === "comment" && props.settings.includeComments){
      if(node.style === "single-line"){
        if(props.settings.minify){
          tempDownloadedCss += "/*" + node.rows[0].value + "*/" + newLine;
        } else{
          tempDownloadedCss += "/* " + node.rows[0].value + " */" + newLine;
        }
      } else if(node.style === "multi-line"){
        tempDownloadedCss += "/*" + newLine;  

        for(x = 0; x < node.rows.length; x++){
          tempDownloadedCss += styleSheetIndent + node.rows[x].value + newLine;  
        }

        tempDownloadedCss += "*/" + newLine + newLine;  
      } else if(node.style === "fancy"){
        if(props.settings.minify){
          tempDownloadedCss += "/*";
        } else{
          tempDownloadedCss += "/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + newLine;
        }

        for(x = 0; x < node.rows.length; x++){        
          tempDownloadedCss += styleSheetIndent + node.rows[x].value + newLine;
        }

        if(props.settings.minify){
          tempDownloadedCss += "*/";
        } else{
          tempDownloadedCss += "/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/" + newLine + newLine;
        }
      } else if(node.style === "extra-fancy"){
        if(props.settings.minify){
          tempDownloadedCss += "/*";
        } else{
          tempDownloadedCss += "/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + newLine;
          tempDownloadedCss += "/*----------------------------------------------" + newLine;
        }

        for(x = 0; x < node.rows.length; x++){
          tempDownloadedCss += styleSheetIndent + node.rows[x].value + newLine;
        }

        if(props.settings.minify){
          tempDownloadedCss += "*/" + newLine;
        } else{
          tempDownloadedCss += "/*----------------------------------------------" + newLine;
          tempDownloadedCss += "/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/" + newLine + newLine;
        }
      }
    } else if(node.type === "loop"){
      if(props.settings.preprocessor === "CSS"){
        for(var z = node.start; z <= node.end; z++){
          var childNode = this.copyObject(node.childNode);

          var dynamicValue = node.dynamicValue * z + node.dynamicModifier;

          childNode.selector = node.childNode.selector.replace("{index}", z)

          childNode.rules = [];

          for(var y = 0; y < node.childNode.rules.length; y++){
            childNode.rules.push({
              name: node.childNode.rules[y].name,
              value: node.dynamicTemplate.replace("{dynamicValue}", dynamicValue).replace("{dynamicUnit}", node.dynamicUnit)
            });
          }

          tempDownloadedCss += this.processNodeForAppliedCss(childNode, newLine, styleSheetIndent, props, index);
        }
      } else if(props.settings.preprocessor === "SCSS"){
        tempDownloadedCss += "This is a SCSS Loop";
      } else if(props.settings.preprocessor === "SASS"){
        tempDownloadedCss += "This is a SASS Loop";
      } else if(props.settings.preprocessor === "LESS"){
        tempDownloadedCss += "This is a LESS Loop";
      } else if(props.settings.preprocessor === "Stylus"){
        tempDownloadedCss += "This is a Stylus Loop";
      }
    }

    return tempDownloadedCss;
  }

  processNodeForDisplayedCss(node, props, index){
    if(node.type === "rule-set"){
      var declarations = [];

      for(var x = 0; x < node.rules.length; x++){
          declarations.push(<Declaration name={node.rules[x].name} value={node.rules[x].value} indent={props.settings.indent} nest={0} key={x}/>)
      }
      return(<RuleSet selector={node.selector} nest={0} space="1" indent={props.settings.indent} key={index}>{declarations}</RuleSet>);
    } else if(node.type === "comment" && props.settings.includeComments){
      if(node.style === "single-line"){
        return(<SingleLine key={index}>{node.rows[0].value}</SingleLine>);
      } else if(node.style === "multi-line"){
        var commentLines = [];

        for(x = 0; x < node.rows.length; x++){
          commentLines.push(<div className='comment-line' key={x}><Indent number={props.settings.indent.number} type={props.settings.indent.type}/>{node.rows[x].value}</div>);
        }

        return(<MultiLine key={index}>{commentLines}</MultiLine>);
      } else if(node.style === "fancy"){
        commentLines = [];

        for(x = 0; x < node.rows.length; x++){
          commentLines.push(<div className='comment-line' key={x}><Indent number={props.settings.indent.number} type={props.settings.indent.type}/>{node.rows[x].value}</div>);
        }

        return(<Fancy key={index}>{commentLines}</Fancy>);
      } else if(node.style === "extra-fancy"){
        commentLines = [];

        for(x = 0; x < node.rows.length; x++){
          commentLines.push(<div className='comment-line' key={x}><Indent number={props.settings.indent.number} type={props.settings.indent.type}/>{node.rows[x].value}</div>);
        }

        return(<ExtraFancy key={index}>{commentLines}</ExtraFancy>);
      }
    } else if(node.type === "loop"){
      if(props.settings.preprocessor === "CSS"){
        var loopNodes = [];

        for(var z = node.start; z <= node.end; z++){
          var childNode = this.copyObject(node.childNode);

          var dynamicValue = node.dynamicValue * z + node.dynamicModifier;

          childNode.selector = node.childNode.selector.replace("{index}", z);

          childNode.rules = [];

          for(var y = 0; y < node.childNode.rules.length; y++){
            childNode.rules.push({
              name: node.childNode.rules[y].name,
              value: node.dynamicTemplate.replace("{dynamicValue}", dynamicValue).replace("{dynamicUnit}", node.dynamicUnit)
            });
          }

          loopNodes.push(this.processNodeForDisplayedCss(childNode, props, index + "-" + z));
        }

        return loopNodes;
      } else{
        return(<Loop loopSettings={node} preprocessor={props.settings.preprocessor} indent={props.settings.indent} key={index}/>)
      }
    }
  }

  copyObject(object){
    return JSON.parse(JSON.stringify(object));
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  // Render
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  render(){
    return (
      <div>
        <AppliedCss>{this.state.appliedCss}</AppliedCss>
        <DisplayedCss 
          preprocessor={this.props.settings.preprocessor}
          minify={this.props.settings.minify}
          downloadHandler={this.download.bind(this)}
          shareHandler={this.share.bind(this)}
          copyHandler={this.copy.bind(this)}
          downloadedCss={this.state.downloadedCss}
        >
          {this.state.displayedCss}
        </DisplayedCss>
      </div>
    )
  }
}

export default CssOutput;