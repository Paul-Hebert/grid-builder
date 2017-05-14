import React from 'react';

const MultiLine = (props) => {
  return (
      <div className="comment">
        <wbr/>
        <div>/*</div>
        <wbr/>
        {props.children}
        <wbr/>
        <div>*/</div>
        <wbr/>
        <div className="space">&nbsp;</div>
      </div>
  );
}

export default MultiLine;
