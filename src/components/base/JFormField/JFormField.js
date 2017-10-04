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

  isError = (/* event */) => (this.props.errorMessage.length > 0)
  isSuccess = (/* event */) => (this.props.successMessage.length > 0)

  onValueChange = (event) => {
    const { onValueChange, secureTextEntry } = this.props

    if (!secureTextEntry) {
      return onValueChange(event.target.value)
    }

    return this.handleSecureTextEntry(event)
  }

  handleSecureTextEntry = (event) => {
    const { onValueChange, value } = this.props
    const newValue = event.target.value

    const valueLengthBefore = value.length
    const valueLengthAfter = newValue.length
    const isSymbolsAdded = (valueLengthBefore < valueLengthAfter)

    if (isSymbolsAdded) {
      const addedSubstr = newValue.substr(valueLengthBefore)
      onValueChange(`${value}${addedSubstr}`)
    } else {
      const removedSymbolsCount = valueLengthBefore - valueLengthAfter
      onValueChange(value.substr(0, valueLengthBefore - removedSymbolsCount))
    }
  }

  setDisabled = disabled => (/* event */) => {
    if (disabled !== this.state.disabled) {
      this.setState({ disabled })
    }
  }

  setFocused = (focused = true) => (/* event */) => this.setState({ focused })
  setInputed = inputed => this.setState({ inputed })

  onSelect = (event) => {
    if (this.props.secureTextEntry) {
      const { selectionStart, selectionEnd } = event.target
      const valueLength = event.target.value.length

      if ((selectionStart > 0) || (selectionEnd < valueLength)) {
        event.target.selectionStart = valueLength // eslint-disable-line no-param-reassign
      }
    }
  }
}

JFormField.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  secureTextEntry: PropTypes.bool,
}

JFormField.defaultProps = {
  placeholder: '',
  errorMessage: '',
  successMessage: '',
  secureTextEntry: false,
}

export default JFormField
