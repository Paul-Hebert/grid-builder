import React, { Component } from 'react';
import GridOutput from "./GridOutput";
import CssOutput from "./CssOutput";
import HtmlOutput from "./HtmlOutput";

class Output extends Component {
  render() {
    return (
        <figure className="output">
            <GridOutput />
            <CssOutput />
            <HtmlOutput />
        </figure>
    );
  }
}

export default Output;
