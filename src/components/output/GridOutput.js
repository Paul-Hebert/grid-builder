import React, { Component } from 'react';
import ColumnOutput from './ColumnOutput.js';
import Row from '../grid/Row.js';

class GridOutput extends Component {
  render() {
    var columns = [];

    for(var i = 0; i < this.props.columns; i++){
      columns.push(<ColumnOutput width="1" breakPointName="md" key={i}/>);
    }
    return (
        <section className="grid-output">
          <header>
            <h2>Grid Output</h2>
          </header>
          <figure>
            <Row>
              {columns}
            </Row>
          </figure>
        </section>
    );
  }
}

export default GridOutput;
