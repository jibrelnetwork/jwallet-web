import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class JbPopover extends Component {
  componentWillMount() {
    // To prevent closing of first open we need timeout
    setTimeout(() => {
      window.addEventListener('click', this.onClick)
    }, 50)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClick)
  }

  onClick = (event) => {
    const popover = ReactDOM.findDOMNode(this.refs[this.props.name])

    if (!popover.contains(event.target)) {
      this.props.onClickOutside()
    }
  }

  render() {
    const { name, body } = this.props

    return <div className={`popover popover--${name}`} ref={name}>{body}</div>
  }
}

JbPopover.propTypes = {
  onClickOutside: PropTypes.func.isRequired,
  body: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
}

export default JbPopover
