import React from 'react';
import ScssLoop from './ScssLoop';
import SassLoop from './SassLoop';
import LessLoop from './LessLoop';
import StylusLoop from './StylusLoop';

const Loop = (props) => {
    if(props.preprocessor === "SCSS"){
        return (
            <ScssLoop loopSettings={props.loopSettings} indent={props.indent}/>
        );
    } else if(props.preprocessor === "SASS"){
        return (
            <SassLoop loopSettings={props.loopSettings} indent={props.indent}/>
        );
    } else if(props.preprocessor === "LESS"){
        return (
            <LessLoop loopSettings={props.loopSettings} indent={props.indent}/>
        );
    } else if(props.preprocessor === "Stylus"){
        return (
            <StylusLoop loopSettings={props.loopSettings} indent={props.indent}/>
        );
    }
}

export default Loop;
 