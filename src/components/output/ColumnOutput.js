import React, { Component } from 'react';
import Column from '../grid/Column.js';

class ColumnOutput extends Component {
  render() {
    return (
        <Column width={this.props.width} breakPointName={this.props.breakPointName}>
          <code className="column-content">
            &lt;div class="col-{this.props.breakPointName}-{this.props.width}"&gt;
          </code>
        </Column>
    );
  }
}

export default ColumnOutput;
