import React, { Component } from 'react';
import Column from './Column.js';
import Row from './Row.js';

class GridOutput extends Component {
  render() {
    return (
        <figure className="grid-output">
          <Row>
            <Column width="9" breakPointName="md"/>
            <Column width="3" breakPointName="md"/>
          </Row>
          <Row>
            <Column width="6" breakPointName="md"/>
            <Column width="6" breakPointName="md"/>
          </Row>
          <Row>
            <Column width="4" breakPointName="md"/>
            <Column width="4" breakPointName="md"/>
            <Column width="4" breakPointName="md"/>
          </Row>
        </figure>
    );
  }
}

export default GridOutput;
