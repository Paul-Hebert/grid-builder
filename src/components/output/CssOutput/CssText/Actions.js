import React, { Component } from 'react';
import Tooltip from "../../../misc/Tooltip"

class Actions extends Component {
  render() {
    return (
        <nav className="actions">
            <i className="fa fa-cloud-download" onClick={this.props.handleDownload}>
              <Tooltip>Download</Tooltip>
            </i>
            <i className="fa fa-share" title="Share" onClick={this.props.handleShare}>
              <Tooltip>Share</Tooltip>
            </i>
            <i className="fa fa-copy" title="Copy" onClick={this.props.handleCopy}>
               <Tooltip>Copy</Tooltip>
            </i>
       </nav>
    );
  }
}

export default Actions;
