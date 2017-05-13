import React from 'react';

const Fancy = (props) => {
  return (
      <div className="comment">
          <div>/*<span className="unminified-comment">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span></div> 
          <div>{props.children}</div>
          <div><span className="unminified-comment">/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span>*/</div>
      </div>
  );
}

export default Fancy;
