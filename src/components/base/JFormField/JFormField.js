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

    if (!placeholder) {
      return null
    }

    return (
      <label
        className={`field__placeholder ${value ? 'field__placeholder--top' : ''}`}
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

  setDisabled = disabled => (/* event */) => {
    if (disabled !== this.state.disabled) {
      this.setState({ disabled })
    }
  }

  prevent = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  isError = (/* event */) => !!this.props.errorMessage
  isSuccess = (/* event */) => !!this.props.successMessage
  onValueChange = event => this.props.onValueChange(event.target.value)
  setFocused = (focused = true) => (/* event */) => this.setState({ focused })
}

JFormField.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
}

JFormField.defaultProps = {
  placeholder: '',
  errorMessage: '',
  successMessage: '',
}

export default JFormField
