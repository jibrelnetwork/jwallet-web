import React, { Component } from 'react'
import './JbButton.css'

class JbButton extends Component {
  render() {
    return (
      <button className="jb-btn btn">{this.props.text}</button>
    )
  }
}

export default JbButton
