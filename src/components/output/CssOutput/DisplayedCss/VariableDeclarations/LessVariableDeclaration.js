import React from 'react';

const LessVariableDeclaration = (props) => {
    return(
        <div className='variable-declaration'>
            @{props.name}
            <span className="colon">:</span>
            &nbsp;
            {props.value}
            <span className="semi-colon">;</span>
        </div>
    );
}

export default LessVariableDeclaration;
 