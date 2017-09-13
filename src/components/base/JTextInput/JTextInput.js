import React, { Component } from 'react'
import PropTypes from 'prop-types'

class JTextInput extends Component {
  constructor(props) {
    super(props)
    this.state = { focused: false }
  }

  render() {
    const {
      // To make sure that onChange handler will not pass to input props
      onValueChange, // eslint-disable-line
      // Prevent of using custom className. Have to use text-input--${name} modifier
      className, // eslint-disable-line
      name,
      placeholder,
      errorMessage,
      successMessage,
      keyboardType,
      editable,
      multiline,
      secureTextEntry,
      ...otherProps
    } = this.props

    const inputProps = {
      name,
      placeholder: this.state.focused ? '' : placeholder,
      className: `text-input__input text-input__input--${name}`,
      type: secureTextEntry ? 'password' : keyboardType,
      disabled: (editable === false),
      onChange: this.onValueChange,
      onFocus: this.setFocused,
      onBlur: this.unsetFocused,
      ...otherProps,
    }

    return (
      <div className={this.getTextInputClassName()}>
        {this.renderInput(inputProps, multiline)}
        {this.renderLabel(name, placeholder)}
        {this.renderMessage(errorMessage, successMessage)}
      </div>
    )
  }

  getTextInputClassName = () => {
    const className = 'text-input'

    if (this.isError()) {
      return `${className} ${className}--error`
    } else if (this.isSuccess()) {
      return `${className} ${className}--success`
    }

    return className
  }

  renderInput = (props, multiline) => {
    return multiline
      ? <textarea {...props} className={`${props.className} text-input__input--multiline`} />
      : <input {...props} />
  }

  renderLabel = (name, label) => {
    const { focused } = this.state
    const labelClassName = `text-input__label ${focused ? '' : 'text-input__label--hidden'}`

    return <label className={labelClassName} htmlFor={name}>{label}</label>
  }

  renderMessage = (errorMessage, successMessage) => {
    const message = this.isError() ? errorMessage : successMessage

    return <div className={'text-input__message'}>{message}</div>
  }

  isError = () => (this.props.errorMessage.length > 0)
  isSuccess = () => (this.props.successMessage.length > 0)

  onValueChange = e => this.props.onValueChange(e.target.value)
  setFocused = (/* event */) => this.setState({ focused: true })
  unsetFocused = (/* event */) => this.setState({ focused: false })
}

JTextInput.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  successMessage: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  multiline: PropTypes.bool,
  editable: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
}

JTextInput.defaultProps = {
  keyboardType: 'text',
  multiline: false,
  editable: false,
  secureTextEntry: false,
}

export default JTextInput
