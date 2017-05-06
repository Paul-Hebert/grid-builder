import React, {Component} from 'react';
import Actions from './Actions';

class CssText extends Component {
  download(){
    console.log("download");
  }
  share(){
    console.log("share");
  }
  copy(){
    console.log("copy");
  }
  render(){
    return (
        <section className="css-output ui-column">
          <header className="ui-column-header">
            <Actions
              handleDownload={this.download}
              handleShare={this.share}
              handleCopy={this.copy}
            />
            <h2>{this.props.preprocessor} Output</h2>
          </header>
          <pre>
            <code>{this.props.children}</code>
          </pre>
        </section>
    );
  }
}

export default CssText;
