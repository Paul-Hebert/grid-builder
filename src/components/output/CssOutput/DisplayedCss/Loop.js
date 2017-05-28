import React from 'react';
import RuleSet from './RuleSet/Index';
import Declaration from './RuleSet/Declaration';

// The entire node is the other prop

const Loop = (props) => {
    if(props.preprocessor === "SCSS"){
        var declarations = [];

        var value = props.loopSettings.dynamicTemplate.replace("{dynamicValue}", (props.loopSettings.dynamicValue + props.loopSettings.dynamicModifier) + props.loopSettings.dynamicUnit + " * $i");

        value = value.replace("{dynamicUnit}", "");

        for(var i = 0; i < props.loopSettings.childNode.rules.length; i++){
            declarations.push(
                <Declaration indent={props.indent} 
                             name={props.loopSettings.childNode.rules[i].name}
                             value={value}
                             key={i}
                             nest={1}
                />
            );
        }

        return (
            <div className="loop">
                <div>@for $i from {props.loopSettings.start} through {props.loopSettings.end} <span className="bracket">{'{'}</span></div>
                    <RuleSet selector={props.loopSettings.childNode.selector.replace("{index}","#{$i}")} nest="1" space="0" indent={props.indent}>{declarations}</RuleSet>
                <div className="bracket">{'}'}</div>
            </div>
        );
    } else if(props.preprocessor === "SASS"){
        return (
            <div className="loop">
                This is a SASS Loop
            </div>
        );
    } else if(props.preprocessor === "LESS"){
        return (
            <div className="loop">
                This is a LESSLoop
            </div>
        );
    } else if(props.preprocessor === "Stylus"){
        return (
            <div className="loop">
                This is a Stylus Loop
            </div>
        );
    }
}

export default Loop;
 