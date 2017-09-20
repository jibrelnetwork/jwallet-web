import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import config from 'config'

import Appearable from 'components/Appearable'

const { popoverClickTimeout, popoverOpeningClosingTimeout } = config

class JPopover extends Appearable {
  componentWillMount() {
    this.setState({ timeout: popoverOpeningClosingTimeout })

    this.open(true)

    setTimeout(() => window.addEventListener('click', this.onClick), popoverClickTimeout)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClick)
  }

  onClick = (event) => {
    const { onClickOutside, name, isCloseOnClickInside, reset } = this.props
    const popover = ReactDOM.findDOMNode(this.refs[name])
    const isClickOutside = !popover.contains(event.target)

    if (isClickOutside || isCloseOnClickInside) {
      this.close(true)

      const timeout = reset ? 0 : popoverOpeningClosingTimeout
      setTimeout(onClickOutside, timeout)
    }
  }

  render() {
    const { name, body } = this.props

    return <div className={this.getPopoverClassName()} ref={name}>{body}</div>
  }

  getPopoverClassName = () => {
    const { name, reset } = this.props
    const { opening, closing } = this.state

    if (reset) {
      // no need to set popover style, if reset flag is true
      return null
    }

    const popoverClassName = `popover popover--${name}`

    if (opening) {
      return `${popoverClassName} popover--opening`
    } else if (closing) {
      return `${popoverClassName} popover--closing`
    }

    return popoverClassName
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
