import React, { Component } from 'react';

class IconInput extends Component {
  constructor(props){
    super();
    this.state ={
        value: props.default
    };
  }
  update(e){
    this.setState({
        value:e.target.value
    });

    this.props.handler(this.props.name, e.target.value);
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
