import React from 'react';
import PropTypes from 'prop-types';
import Indent from '../Indent';

const RuleSet = (props) => {
  var spaces = [];

  for(var i = 0; i < props.space; i++){
    spaces.push(<div className="space" key={i}>&nbsp;</div>)
  }

  var nestIndent = [];

  for(var x = 0; x < props.nest; x++) {
    nestIndent.push(<Indent type={props.indent.type} number={props.indent.number} key={x}/>)
  }

  return (
      <div className="rule-set">
        <div>{nestIndent}<span className="selector">{props.selector}</span><span className="bracket">{'{'}</span></div>
          {props.children}
        <div>{nestIndent}<span className="bracket">{'}'}</span></div>
        {spaces}
      </div>
  );
}

RuleSet.propTypes = {
    nest: PropTypes.number.isRequired,
    space: PropTypes.number.isRequired,
    selector: PropTypes.string.isRequired,
    indent: PropTypes.shape({
        number: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    })
}

export default RuleSet;
