import React from 'react';

const ExtraFancy = (props) => {
  return (
      <div className="comment">
          <div>/*<span className="unminified-comment">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span></div> 
          <div className="unminified-comment">/*----------------------------------------------</div> 
          <div>{props.children}</div>
          <div className="unminified-comment">/*----------------------------------------------</div> 
          <div><span className="unminified-comment">/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span>*/</div>
      </div>
  );
}

export default ExtraFancy;
