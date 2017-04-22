import React, { Component } from 'react';
import ColumnOutput from './ColumnOutput.js';
import Row from '../grid/Row.js';

class GridOutput extends Component {
  render() {
    return (
        <figure className="grid-output">
          <Row>
            <ColumnOutput width="9" breakPointName="md"/>
            <ColumnOutput width="3" breakPointName="md"/>
          </Row>
          <Row>
            <ColumnOutput width="6" breakPointName="md"/>
            <ColumnOutput width="6" breakPointName="md"/>
          </Row>
          <Row>
            <ColumnOutput width="4" breakPointName="md"/>
            <ColumnOutput width="4" breakPointName="md"/>
            <ColumnOutput width="4" breakPointName="md"/>
          </Row>
        </figure>
    );
  }
}

export default GridOutput;
