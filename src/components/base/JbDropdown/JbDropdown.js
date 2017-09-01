import React, { Component } from 'react'
import PropTypes from 'prop-types'

class JbDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  render() {
    const { title, parentClassName, className } = this.props

    return (
      <div className={parentClassName} onClick={this.showDropdown}>
        <div className={className}>
          <div className={`${className}__title-wrap`}>{title}</div>
          {this.renderChildren()}
        </div>
      </div>
    )
  }

  renderChildren() {
    const { props, hideDropdown, state } = this

    if (!state.isOpen) {
      return null
    }

    return React.cloneElement(props.children, { onClickOutside: hideDropdown })
  }

  showDropdown = () => this.setState({ isOpen: true })

  hideDropdown = () => this.setState({ isOpen: false })
}

JbDropdown.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.node.isRequired,
  parentClassName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
}

export default JbDropdown
