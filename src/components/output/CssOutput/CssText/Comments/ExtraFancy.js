import React from 'react';

const ExtraFancy = (props) => {
  return (
      <div className="comment">
          <wbr/>
          <div>/*<span className="unminified-comment">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span></div> 
          <div className="unminified-comment">/*----------------------------------------------</div> 
          <wbr/>
          <div>{props.children}</div>
          <wbr/>
          <div className="unminified-comment">/*----------------------------------------------</div> 
          <div><span className="unminified-comment">/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span>*/</div>
          <wbr/>
          <div className="space">&nbsp;</div>
      </div>
  );
}

export default ExtraFancy;
