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
      </div>
  );
}

export default MultiLine;
