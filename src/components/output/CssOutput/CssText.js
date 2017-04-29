import React, { Component } from 'react';

class CssText extends Component {
  render() {
    return (
        <section className="css-output">
          <header>
            <h2>CSS Output</h2>
          </header>
          <pre>
            <code>{this.props.children}</code>
          </pre>
        </section>
    );
  }
}

export default CssText;
