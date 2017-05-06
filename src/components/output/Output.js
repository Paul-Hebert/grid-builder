import React from 'react';
import GridOutput from "./GridOutput";
import CssOutput from "./CssOutput/Index";

const Output = (props) => {
  return (
      <figure className="output">
          <GridOutput columns={props.settings.columns}/>
          <CssOutput  settings={props.settings}/>
      </figure>
  );
}

export default Output;
