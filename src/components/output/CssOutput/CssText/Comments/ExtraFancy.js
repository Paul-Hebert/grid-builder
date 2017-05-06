import React from 'react';

const ExtraFancy = (props) => {
  return (
      <div className="comment">
          <div>/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div> 
          <div>/*----------------------------------------------</div> 
          <div>{props.children}</div>
          <div>/*----------------------------------------------</div> 
          <div>/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/</div>
      </div>
  );
}

export default ExtraFancy;
