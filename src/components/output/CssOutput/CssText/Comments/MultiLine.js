import React from 'react';

const MultiLine = (props) => {
  return (
      <div className="comment">
        <div>/*</div>
          {props.children}
        <div>*/</div>
      </div>
  );
}

export default MultiLine;
