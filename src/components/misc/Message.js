import React from 'react';

const Message = (props) => {
    if(props.exists){
        return(
            <div className={"message " + props.classes} onClick={props.closeHandler}>
                <div className="message-header">{props.header}</div>
                <div className="message-details">{props.details}</div>
                <i className="fa fa-times-circle"></i>
            </div>
        );
    } else{
        return null;
    }
}

export default Message;