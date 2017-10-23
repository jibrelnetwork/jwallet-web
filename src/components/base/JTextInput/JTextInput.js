import React from 'react'
import PropTypes from 'prop-types'

import JFormField from 'components/base/JFormField'

class JTextInput extends JFormField {
  constructor(props) {
    super(props)
    this.state = { focused: false, disabled: !props.editable }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ disabled: !nextProps.editable })
  }

  render() {
    const {
      // To make sure that onChange handler will not pass to input props
      onValueChange, // eslint-disable-line
      // Prevent of using custom className. Have to use text-input--${name} modifier
      className, // eslint-disable-line
      errorMessage, // eslint-disable-line
      successMessage, // eslint-disable-line
      secureTextEntry,
      name,
      value,
      placeholder,
      keyboardType,
      readOnly,
      editable,
      multiline,
      preventCopy,
      unselectable,
      ...otherProps
    } = this.props

    const inputProps = {
      name,
      value,
      readOnly,
      disabled: this.state.disabled,
      className: `field__input field__input--${name}`,
      type: secureTextEntry ? 'password' : keyboardType || 'text',
      onChange: this.onValueChange,
      onFocus: this.setFocused(),
      onBlur: this.setFocused(false),
      ...otherProps,
    }

    if (preventCopy) {
      inputProps.onCut = this.prevent
      inputProps.onCopy = this.prevent
    }

    if (unselectable) {
      inputProps.onFocus = this.prevent
      inputProps.unselectable = 'on'
      inputProps.className += ' unselectable'
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
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  keyboardType: PropTypes.string,
  readOnly: PropTypes.bool,
  editable: PropTypes.bool,
  multiline: PropTypes.bool,
  preventCopy: PropTypes.bool,
  unselectable: PropTypes.bool,
}

JTextInput.defaultProps = {
  onValueChange: () => {},
  keyboardType: 'text',
  errorMessage: '',
  successMessage: '',
  readOnly: false,
  editable: false,
  multiline: false,
  preventCopy: false,
  unselectable: false,
}

export default JTextInput
