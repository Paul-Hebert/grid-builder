import React from 'react';

const AppliedCss = (props) => {
  return (
      <style type="text/css">
          {props.children}
      </style>
  );
}

export default AppliedCss;
