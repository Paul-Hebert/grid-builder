import React, { Component } from 'react';
import GridOutput from "./GridOutput";
import CssOutput from "./CssOutput";

class Output extends Component {
  render() {
    return (
        <figure className="output">
            <GridOutput />
            <CssOutput />
        </figure>
    );
  }
}

export default Output;
