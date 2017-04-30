import React, { Component } from 'react';

class ExtraFancy extends Component {
  render() {
    return (
        <div className="comment">
            <div>/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div> 
            <div>/*----------------------------------------------</div> 
            <div>{this.props.children}</div>
            <div>/*----------------------------------------------</div> 
            <div>/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/</div>
        </div>
    );
  }
}

export default ExtraFancy;
