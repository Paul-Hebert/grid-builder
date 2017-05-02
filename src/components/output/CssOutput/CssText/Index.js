import React, { Component } from 'react';

class CssText extends Component {
  render() {
    return (
        <section className="css-output ui-column">
          <header className="ui-column-header">
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
