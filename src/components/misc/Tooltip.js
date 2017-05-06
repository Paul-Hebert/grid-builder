import React from 'react';

const Tooltip = (props) => {
    return(
        <div className="tooltip">
            <div className="tooltip-content">
                {props.children}
            </div>
        </div>
    )
}

export default Tooltip;