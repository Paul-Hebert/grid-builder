import React from 'react';

const ClosedSingleLine = (props) => {
  return (
      <div className="comment">
          <div>/* {props.children} */</div>
      </div>
  );
}

export default ClosedSingleLine;
