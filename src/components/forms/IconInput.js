import React, { Component } from 'react';

class IconInput extends Component {
  render() {
    return (
        <div className={"icon-input " + this.props.extraClass}>
            <i className={"fa fa-" + this.props.icon + " " + this.props.additionalClasses} aria-hidden="true"></i>
            {this.props.children}
        </div>
    );
  }
}

export default IconInput;
