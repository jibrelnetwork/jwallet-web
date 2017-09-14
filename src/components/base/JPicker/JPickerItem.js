import React, { Component } from 'react'
import PropTypes from 'prop-types'

class JPickerItem extends Component {
  render() {
    const { label } = this.props

    return <div className={this.getPickerItemClassName()} onClick={this.onValueChange}>{label}</div>
  }

  getPickerItemClassName = () => {
    const { selected, disabled } = this.props
    const pickerItemClassName = 'picker__item'

    if (selected) {
      return `${pickerItemClassName} ${pickerItemClassName}--selected`
    } else if (disabled) {
      return `${pickerItemClassName} ${pickerItemClassName}--disabled`
    }

    return pickerItemClassName
  }

  onValueChange = (e) => {
    const { onValueChange, value, disabled } = this.props

    if (!disabled) {
      return onValueChange(value)
    }

    return e.stopPropagation()
  }
}

JPickerItem.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onValueChange: PropTypes.func,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
}

JPickerItem.defaultProps = {
  onValueChange: () => {},
  selected: false,
  disabled: false,
}

export default JPickerItem
