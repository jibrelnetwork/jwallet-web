import React from 'react'
import PropTypes from 'prop-types'

import JFormField from 'components/base/JFormField'

class JTextInput extends JFormField {
  constructor(props) {
    super(props)
    this.state = { focused: false, disabled: !props.editable }
  }

  componentWillReceiveProps(nextProps) {
    this.setDisabled(!nextProps.editable)
  }

  render() {
    const {
      // To make sure that onChange handler will not pass to input props
      onValueChange, // eslint-disable-line
      // Prevent of using custom className. Have to use text-input--${name} modifier
      className, // eslint-disable-line
      errorMessage, // eslint-disable-line
      successMessage, // eslint-disable-line
      name,
      value,
      placeholder,
      keyboardType,
      editable,
      multiline,
      secureTextEntry,
      ...otherProps
    } = this.props

    const inputProps = {
      name,
      value,
      className: `field__input field__input--${name}`,
      type: secureTextEntry ? 'password' : keyboardType,
      disabled: this.state.disabled,
      onChange: this.onValueChange,
      onFocus: this.setFocused(),
      onBlur: this.setFocused(false),
      ...otherProps,
    }

    return (
      <div className={this.getMainClassName()}>
        {this.renderPlaceholder(value)}
        {this.renderInput(inputProps, multiline)}
        {this.renderMessage()}
      </div>
    )
  }

  renderInput = (props, multiline) => {
    return multiline
      ? <textarea {...props} className={`${props.className} field__input--multiline`} />
      : <input {...props} />
  }
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
