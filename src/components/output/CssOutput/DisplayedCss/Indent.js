import React from 'react';
import PropTypes from 'prop-types';

const Indent = (props) => {
    var indentation = "";
    var indentCharacter = "";

    if(props.type === "tab"){
      indentCharacter = "\t";
    } else{
      indentCharacter = " ";
    }

    for(var i = 0; i < props.number; i++){
      indentation += indentCharacter;
    }

    return (<span className="indent">{indentation}</span>);
}

Indent.PropTypes = {
  type: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
}

export default Indent;
 