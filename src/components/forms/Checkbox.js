import React, { Component } from 'react';

class Checkbox extends Component {
  update(e){
    var checkBoxBool = false;

    if(e.target.checked){
        checkBoxBool = true;
    }

    this.props.handler(this.props.names, checkBoxBool);
  }
  render() {
    return (
        <input type="checkbox"
            onChange={this.update.bind(this)} 
            className={this.props.className}
            defaultChecked={this.props.value}
        />
    );
  }
}

export default Checkbox;
