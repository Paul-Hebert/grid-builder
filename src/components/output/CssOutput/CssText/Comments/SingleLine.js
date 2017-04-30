import React, { Component } from 'react';

class SingleLine extends Component {
  render() {
    return (
        <div className="comment">// {this.props.children}</div>
    );
  }
}

export default SingleLine;
