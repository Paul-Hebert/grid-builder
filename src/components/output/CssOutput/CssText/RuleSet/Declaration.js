import React from 'react';
import Indent from '../Indent';

const Declaration = (props) => {
  return (
      <div className="declaration">
          <Indent number={props.indent.number} type={props.indent.type}/>
          <span className="name">{props.name}</span>
          <span className="colon">:</span>
          <span className="space">&nbsp;</span>
          <span className="value">{props.value}</span>
          <span className="semicolon">;</span>
      </div>
  );
}

export default Declaration;
