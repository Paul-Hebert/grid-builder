import React from 'react';
import SassVariableDeclaration from './SassVariableDeclaration';
import LessVariableDeclaration from './LessVariableDeclaration';
import StylusVariableDeclaration from './StylusVariableDeclaration';

const VariableDeclaration = (props) => {
    var spaces = [];

    for(var i = 0; i < props.spaces; i++){
        spaces.push(<div>&nbsp;</div>);
    }

    if(props.preprocessor === "SCSS" || props.preprocessor === "SASS"){
        return (
            <div>
                <SassVariableDeclaration name={props.name} value={props.value} indent={props.indent}/>
                {spaces}
            </div>
        );
    } else if(props.preprocessor === "LESS"){
        return (
            <div>
                <LessVariableDeclaration name={props.name} value={props.value} indent={props.indent}/>
                {spaces}
            </div>        
        );
    } else if(props.preprocessor === "Stylus"){
        return (
            <div>
                <StylusVariableDeclaration name={props.name} value={props.value} indent={props.indent}/>
                {spaces}
            </div>        
        );
    } else{
        return null;
    }
}

export default VariableDeclaration;
 