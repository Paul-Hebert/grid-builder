import React from 'react';

const IconInput = (props) => {
  return (
      <div className={"icon-input " + props.extraClass}>
          <i className={"fa fa-" + props.icon + " " + props.additionalClasses} aria-hidden="true"></i>
          {props.children}
      </div>
  );
}

export default IconInput;
