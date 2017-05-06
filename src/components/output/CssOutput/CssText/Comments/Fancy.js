import React from 'react';

const Fancy = (props) => {
  return (
      <div className="comment">
          <div>/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div> 
          <div>{props.children}</div>
          <div>/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/</div>
      </div>
  );
}

export default Fancy;
