import React from 'react';

const StyleSheet = (props) => {
  return (
      <style type="text/css">
          {props.children}
      </style>
  );
}

export default StyleSheet;
