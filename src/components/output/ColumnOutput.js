import React from 'react';
import Column from '../grid/Column.js';

const ColumnOutput = (props) => {
  return (
      <Column width={props.width}>
        <span className="column-content">
          {props.width}
        </span>
      </Column>
  );
}

export default ColumnOutput;
