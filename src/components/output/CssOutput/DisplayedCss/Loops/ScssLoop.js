import React from 'react';
import RuleSet from '../RuleSet/Index';
import Declaration from '../RuleSet/Declaration';

const ScssLoop = (props) => {
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
            <div>
                <span className="key-word">@for </span>
                <span className="variable">$i</span>
                <span className="key-word"> from </span>
                {props.loopSettings.start}
                <span className="key-word"> through </span>
                {props.loopSettings.end}
                <span className="bracket">{' {'}</span>
            </div>
                <RuleSet selector={props.loopSettings.childNode.selector.replace("{index}","#{$i}")} nest="1" space="0" indent={props.indent}>{declarations}</RuleSet>
            <div className="bracket">{'}'}</div>
        </div>
    );
}

export default ScssLoop;
 