import React, { Component } from 'react';

class CssOutput extends Component {
  render() {
    return (
        <section className="css-output">
          <header>
            <h2>CSS Output</h2>
          </header>
          <pre>
            <code>/* Code */</code>
          </pre>
        </section>
    );
  }
}

export default CssOutput;
