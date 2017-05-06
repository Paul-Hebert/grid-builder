import React, { Component } from 'react';
import Actions from './Actions';

class CssText extends Component {
  render() {
    return (
        <section className="css-output ui-column">
          <header className="ui-column-header">
            <Actions/>
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
