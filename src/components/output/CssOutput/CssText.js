import React, { Component } from 'react';

class CssText extends Component {
  render() {
    return (
        <section className="css-output">
          <header>
            <h2>{this.props.preprocessor} Output</h2>
          </header>
          <pre>
            {/* TODO: Convert this section to React JSX instead of HTML string */}
            <code dangerouslySetInnerHTML={{ __html: this.props.children }} />
          </pre>
        </section>
    );
  }
}

export default CssText;
