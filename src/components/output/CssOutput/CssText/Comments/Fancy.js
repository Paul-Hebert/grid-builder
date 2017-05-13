import React from 'react';

const Fancy = (props) => {
  return (
      <div className="comment">
          <wbr/>
          <div>/*<span className="unminified-comment">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span></div> 
          <wbr/>
          <div>{props.children}</div>
          <wbr/>
          <div><span className="unminified-comment">/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</span>*/</div>
          <wbr/>
      </div>
  );
}

export default Fancy;
