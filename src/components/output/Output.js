import React, { Component } from 'react';
import GridOutput from "./GridOutput";
import CssOutput from "./CssOutput/Index";

class Output extends Component {
  render() {
    return (
        <figure className="output">
            <GridOutput columns={this.props.settings.columns}/>
            <CssOutput  columns={this.props.settings.columns} gutter={this.props.settings.gutter}/>
        </figure>
    );
  }
}

export default Output;
