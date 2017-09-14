import React, { Component } from 'react'
import PropTypes from 'prop-types'

class JFormField extends Component {
  getMainClassName = () => {
    const mainClassName = 'field'

    if (this.isError()) {
      return `${mainClassName} ${mainClassName}--error`
    } else if (this.isSuccess()) {
      return `${mainClassName} ${mainClassName}--success`
    }

    return mainClassName
  }

  renderPlaceholder = (value) => {
    const { name, placeholder } = this.props

    if (!placeholder.length) {
      return null
    }

    const isValuePresent = value && value.length

    return (
      <label
        className={`field__placeholder ${isValuePresent ? 'field__placeholder--top' : ''}`}
        htmlFor={name}
      >
        {placeholder}
      </label>
    )
  }

  renderMessage = () => {
    const { errorMessage, successMessage } = this.props
    const message = this.isError() ? errorMessage : successMessage

    return <div className={'field__message'}>{message}</div>
  }

  isError = () => (this.props.errorMessage.length > 0)
  isSuccess = () => (this.props.successMessage.length > 0)

  onValueChange = e => this.props.onValueChange(e.target.value)

  setDisabled = disabled => (/* event */) => {
    if (disabled !== this.state.disabled) {
      this.setState({ disabled })
    }
  }

  setFocused = (focused = true) => (/* event */) => this.setState({ focused })
}

JFormField.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
}

export default JFormField
