import React, { Component } from 'react';

class ClosedSingleLine extends Component {
  render() {
    return (
        <div className="comment">
            <div>/* {this.props.children} */</div>
        </div>
    );
  }
}

export default ClosedSingleLine;
