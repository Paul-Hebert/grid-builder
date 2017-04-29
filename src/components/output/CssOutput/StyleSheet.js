import React, { Component } from 'react';

class StyleSheet extends Component {
  render() {
    return (
        <style type="text/css">
            {this.props.children}
        </style>
    );
  }
}

export default StyleSheet;
