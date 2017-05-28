import React from 'react';

const SingleLine = (props) => {  
  if(props.preprocessor === "CSS"){
    return (<div className="comment"><wbr/>/*<wbr/><span className="space"> </span>{props.children}<span className="space"> </span>*/<wbr/></div>);
  } else{
    return (<div className="comment"><wbr/>//<wbr/><span className="space"> </span>{props.children}<wbr/></div>);
  }
}

export default SingleLine;
