import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class JPopover extends Component {
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
    const { name, body, reset } = this.props

    // no need to set popover style, if reset flag is true
    const popoverClassName = reset ? null : `popover popover--${name}`

    return <div className={popoverClassName} ref={name}>{body}</div>
  }
}

JPopover.propTypes = {
  onClickOutside: PropTypes.func.isRequired,
  body: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  isCloseOnClickInside: PropTypes.bool,
  reset: PropTypes.bool,
}

JPopover.defaultProps = {
  isCloseOnClickInside: false,
  reset: false,
}

export default JPopover
