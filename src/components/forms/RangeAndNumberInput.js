import React, { Component } from 'react';

class IconInput extends Component {
  constructor(){
    super();
    this.state ={
        value:50
    };
  }
  update(event){
    this.setState({
        value:event.target.value
    });
  }
  render() {
    return (
        <div className="range-and-number-input">
            <input type="number" 
                   value={this.state.value} 
                   min={this.props.min} 
                   max={this.props.max}
                   onChange={this.update.bind(this)}
            />
            <input type="range" 
                   value={this.state.value} 
                   min={this.props.min} 
                   max={this.props.max}
                   onChange={this.update.bind(this)}
            />
        </div>
    );
  }
}

export default IconInput;
