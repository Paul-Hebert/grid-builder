import React, { Component } from 'react';

class Actions extends Component {
  render() {
    return (
        <nav className="actions">
            <i className="fa fa-cloud-download" title="Download"></i>
            <i className="fa fa-share" title="Share"></i>
            <i className="fa fa-copy" title="Copy"></i>
        </nav>
    );
  }
}

export default Actions;
