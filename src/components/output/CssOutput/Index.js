import React, { Component } from 'react';
import Stylesheet from "./StyleSheet";
import CssText from "./CssText";

class CssOutput extends Component {
  render() {
    return (
      <div className="css-output">
        <Stylesheet/>
        <CssText/>
      </div>
    )
  }
}

export default CssOutput;
