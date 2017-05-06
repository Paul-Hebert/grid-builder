import React, { Component } from 'react';

class Actions extends Component {
  render() {
    return (
        <nav className="actions">
            <i className="fa fa-cloud-download" title="Download" onClick={this.props.handleDownload}></i>
            <i className="fa fa-share" title="Share" onClick={this.props.handleShare}></i>
            <i className="fa fa-copy" title="Copy" onClick={this.props.handleCopy}></i>
        </nav>
    );
  }
}

export default Actions;
