import React from 'react';
import PropTypes from 'prop-types';
import Indent from '../Indent';

const Declaration = (props) => {
  return (
      <div className="declaration">
          <wbr/>
          <Indent number={props.indent.number * (1 + props.nest)} type={props.indent.type}/>
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

Declaration.propTypes = {
    nest: PropTypes.number.isRequired,
}

export default Declaration;
