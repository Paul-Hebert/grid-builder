import React, { Component } from 'react';

class IconInput extends Component {
  render() {
    return (
        <div className="icon-input">
            <i className={"fa fa-" + this.props.icon} aria-hidden="true"></i>
            {this.props.children}
        </div>
    );
  }
}

export default IconInput;
