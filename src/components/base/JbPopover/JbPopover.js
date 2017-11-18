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
    const { onClickOutside, name, isCloseOnClickInside } = this.props
    const popover = ReactDOM.findDOMNode(this.refs[name])
    const isClickOutside = !popover.contains(event.target)

    if (isClickOutside || isCloseOnClickInside) {
      onClickOutside()
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
  isCloseOnClickInside: PropTypes.bool,
}

JbPopover.defaultProps = {
  isCloseOnClickInside: false,
}

export default JbPopover
