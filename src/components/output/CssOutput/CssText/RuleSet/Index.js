import React from 'react';

const RuleSet = (props) => {
  return (
      <div className="rule-set">
        <div><span className="selector">{props.selector}</span><span className="bracket">{'{'}</span></div>
          {props.children}
        <div className="bracket">{'}'}</div>
      </div>
  );
}

export default RuleSet;
