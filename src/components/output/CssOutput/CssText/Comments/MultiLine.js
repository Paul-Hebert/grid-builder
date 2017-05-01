import React, { Component } from 'react';

class MultiLine extends Component {
  render() {
    return (
        <div className="comment">
          <div>/*</div>
            {this.props.children}
          <div>*/</div>
        </div>
    );
  }
}

export default MultiLine;
