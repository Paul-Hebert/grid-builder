import React, { Component } from 'react';

class Column extends Component {
  render() {
    return (
        <div className={"col-" + this.props.breakPointName + "-" + this.props.width}>{this.props.width}</div>
    );
  }
}

export default Column;
