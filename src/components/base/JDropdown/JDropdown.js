import React, { Component } from 'react'
import PropTypes from 'prop-types'

class JDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
  }

  render() {
    const { title, parentClassName, className } = this.props

    return (
      <div className={parentClassName} onClick={this.showDropdown()}>
        <div className={className}>
          <div className={`${className}__title-wrap`}>{title}</div>
          {this.renderChildren()}
        </div>
      </div>
    )
  }

  renderChildren() {
    const { props, showDropdown, state } = this

    if (!state.isOpen) {
      return null
    }

    return React.cloneElement(props.children, { onClickOutside: showDropdown(false) })
  }

  showDropdown = (isOpen = true) => (event) => {
    this.setState({ isOpen })

    if (event) {
      event.stopPropagation()
    }
  }
}

JDropdown.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.element.isRequired,
  className: PropTypes.string.isRequired,
  parentClassName: PropTypes.string,
}

JDropdown.defaultProps = {
  parentClassName: '',
}

export default JDropdown
