import React, { Component } from 'react';
import ColumnOutput from './ColumnOutput.js';
import Row from '../grid/Row.js';

class GridOutput extends Component {
  render() {
    var rows = []

    for (var x = 1; x <= this.props.columns; x++){
      var columns = [];

      columns.push(<ColumnOutput width={x} key={0}/>)

      for(var i = x; i < this.props.columns; i++){
        columns.push(<ColumnOutput width="1" key={i}/>);
      }

      rows.push(<Row key={x}>{columns}</Row>)      
    }

    return (
        <section className="grid-output">
          <header>
            <h2>Grid Output</h2>
          </header>
          <figure>
            {rows}
          </figure>
        </section>
    );
  }
}

export default GridOutput;
