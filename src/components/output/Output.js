import React, { Component } from 'react';
import GridOutput from "./GridOutput";
import CssOutput from "./CssOutput/Index";

class Output extends Component {
  render() {
    return (
        <figure className="output">
            <GridOutput columns={this.props.columns}/>
            <CssOutput />
        </figure>
    );
  }
}

export default Output;
