import React from 'react';

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

export default Indent;
 