import React, { Component } from 'react';
import Column from '../grid/Column.js';

class ColumnOutput extends Component {
  render() {
    return (
        <Column width={this.props.width}>
          <code className="column-content">
            {this.props.width}
          </code>
        </Column>
    );
  }
}

export default ColumnOutput;
