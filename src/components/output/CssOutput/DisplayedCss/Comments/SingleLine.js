import React from 'react';
import PropTypes from 'prop-types';

const SingleLine = (props) => {  
  if(props.preprocessor === "CSS"){
    return (<div className="comment"><wbr/>/*<wbr/><span className="space"> </span>{props.children}<span className="space"> </span>*/<wbr/></div>);
  } else{
    return (<div className="comment"><wbr/>//<wbr/><span className="space"> </span>{props.children}<wbr/></div>);
  }
}

SingleLine.propTypes = {
    preprocessor: PropTypes.string.isRequired
}

export default SingleLine;

