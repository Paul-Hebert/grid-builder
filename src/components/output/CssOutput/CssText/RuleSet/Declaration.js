import React from 'react';
import Indent from '../Indent';

const Declaration = (props) => {
  return (
      <div className="declaration">
          <wbr/>
          <Indent number={props.indent.number} type={props.indent.type}/>
          <wbr/>
          <span className="name">{props.name}</span>
          <wbr/>
          <span className="colon">:</span>
          <wbr/>
          <span className="space"> </span>
          <wbr/>
          <span className="value">{props.value}</span>
          <wbr/>
          <span className="semicolon">;</span>
          <wbr/>
      </div>
  );
}

export default Declaration;
