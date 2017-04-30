import React, { Component } from 'react';

class RuleSet extends Component {
  render() {
    return (
        <div className="selector">
          <div><span className="selector">{this.props.selector}</span><span className="bracket">{'{'}</span></div>
            {this.props.children}
          <div className="bracket">{'}'}</div>
        </div>
    );
  }
}

export default RuleSet;
