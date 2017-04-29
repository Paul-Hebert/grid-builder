import React, { Component } from 'react';
import CssBeautify from 'cssbeautify/cssbeautify.js';

class CssText extends Component {
  render() {
    return (
        <section className="css-output">
          <header>
            <h2>CSS Output</h2>
          </header>
          <pre>
            <code>{CssBeautify(this.props.children)}</code>
          </pre>
        </section>
    );
  }
}

export default CssText;
