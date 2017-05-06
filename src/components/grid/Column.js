import React from 'react';

const Column = (props) => {
  return (
      <div className={"col-" + props.width}>{props.children}</div>
  );
}

export default Column;
