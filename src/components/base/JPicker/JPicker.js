import React from 'react'
import PropTypes from 'prop-types'

import { JFormField, JIcon, JPopover } from 'components/base'

import JPickerItem from './JPickerItem'

class JPicker extends JFormField {
  constructor(props) {
    super(props)
    this.state = { focused: false, disabled: !props.enabled }
  }

  componentWillReceiveProps(nextProps) {
    this.setDisabled(!nextProps.enabled)
  }

  render() {
    return (
      <div className={this.getMainClassName()}>
        {this.renderPlaceholder(this.props.selectedValue)}
        {this.renderSelect()}
        {this.renderArrowIcon()}
        {this.renderMessage()}
      </div>
    )
  }

  renderSelect = () => {
    const { selectedValue, name } = this.props
    const { focused, disabled } = this.state

    const selectClassName = `field__select field__select--${name}`

    return (
      <div
        className={`${selectClassName} ${disabled ? 'field__select--disabled' : ''}`}
        onClick={disabled ? null : this.setFocused(!focused)}
      >
        <div className='picker__selected'>{selectedValue}</div>
        <div className={`picker__items ${focused ? '' : 'picker__items--hidden'}`}>
          {this.renderSelectChildren()}
        </div>
      </div>
    )
  }

  renderSelectChildren = () => {
    const { onValueChange, children, selectedValue, name } = this.props
    const { focused, disabled } = this.state

    if (!focused || disabled) {
      return null
    }

    const body = React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        onValueChange,
        selected: (child.props.value === selectedValue),
      })
    })

    return <JPopover onClickOutside={this.setFocused(false)} body={body} name={name} reset />
  }

  renderArrowIcon = () => {
    return (
      <JIcon
        small
        name={`small-arrow${this.state.focused ? '-up' : ''}`}
        className='picker__arrow-icon'
      />
    )
  }
}

JPicker.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  enabled: PropTypes.bool,
}

JPicker.defaultProps = {
  errorMessage: '',
  successMessage: '',
  enabled: true,
}

JPicker.Item = JPickerItem

export default JPicker
