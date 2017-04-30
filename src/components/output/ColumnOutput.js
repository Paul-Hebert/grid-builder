import React, { Component } from 'react';
import Column from '../grid/Column.js';

class ColumnOutput extends Component {
  render() {
    return (
        <Column width={this.props.width}>
          <span className="column-content">
            {this.props.width}
          </span>
        </Column>
    );
  }
}

export default ColumnOutput;
