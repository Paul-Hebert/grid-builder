import React, { Component } from 'react';

class Fancy extends Component {
  render() {
    return (
        <div className="comment">
            <div>/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div> 
            <div>{this.props.children}</div>
            <div>/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/</div>
        </div>
    );
  }
}

export default Fancy;
