import React, { Component } from 'react';
import ColumnOutput from './ColumnOutput.js';
import Row from '../grid/Row.js';

class GridOutput extends Component {
  render() {
    return (
        <section className="grid-output">
          <header>
            <h2>Grid Output</h2>
          </header>
          <figure>
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
        </section>
    );
  }
}

export default GridOutput;
