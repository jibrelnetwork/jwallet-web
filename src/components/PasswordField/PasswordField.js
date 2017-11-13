import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Keystore from 'jwallet-web-keystore'

import config from 'config'

import { JIcon, JTextInput } from 'components/base'

class PasswordField extends Component {
  constructor(props) {
    super(props)
    this.state = { status: 'default', message: '', isConfirmed: false }
  }

  render() {
    return (
      <div>
        {this.renderPassword()}
        {this.renderPasswordConfirm()}
      </div>
    )
  }

  renderPassword() {
    return (
      <div className={`password password--${this.state.status}`}>
        {this.renderPasswordInput()}
        {this.renderPasswordMessage()}
      </div>
    )
  }

  renderPasswordConfirm = () => {
    if (!this.props.withConfirm) {
      return null
    }

    return (
      <div className={`password ${this.state.isConfirmed ? 'password--blue' : ''}`}>
        {this.renderPasswordConfirmInput()}
        {this.renderPasswordConfirmIcon()}
      </div>
    )
  }

  renderPasswordInput = () => {
    const { password, placeholder, passwordError } = this.props

    return (
      <JTextInput
        onValueChange={this.onPasswordChange}
        name='password'
        placeholder={placeholder}
        value={password}
        errorMessage={passwordError}
        editable
        preventCopy
        secureTextEntry
      />
    )
  }

  renderPasswordConfirmInput = () => {
    const { passwordConfirm, passwordConfirmError } = this.props

    return (
      <JTextInput
        onValueChange={this.onPasswordConfirmChange}
        name='password-confirm'
        placeholder='Confirm password'
        value={passwordConfirm}
        errorMessage={passwordConfirmError}
        editable
        preventCopy
        secureTextEntry
      />
    )
  }

  renderPasswordMessage = () => {
    if (!this.props.password.length) {
      return null
    }

    const { message } = this.state
    const passwordMessage = message.length ? message : <JIcon name='networks-checkbox' small />

    return <div className='password__message'>{passwordMessage}</div>
  }

  renderPasswordConfirmIcon = () => {
    return !this.state.isConfirmed ? null : (
      <div className='password__message'>
        <JIcon name='networks-checkbox' small />
      </div>
    )
  }

  onPasswordChange = (password) => {
    if (password.length > config.maxPasswordLength) {
      return
    }

    const { onPasswordChange, passwordConfirm } = this.props

    onPasswordChange(password)

    const { status, message } = this.getStatus(password)
    const isConfirmed = this.isConfirmed(password, passwordConfirm, status)

    this.setState({ status, message, isConfirmed })
  }

  onPasswordConfirmChange = (passwordConfirm) => {
    if (passwordConfirm.length > config.maxPasswordLength) {
      return
    }

    const { onPasswordConfirmChange, password } = this.props

    onPasswordConfirmChange(passwordConfirm)

    const isConfirmed = this.isConfirmed(password, passwordConfirm, this.state.status)
    this.setState({ isConfirmed })
  }

  getStatus = (password) => {
    const { failedTests } = Keystore.testPassword(password)
    const isEmpty = !password.length
    const isShort = password.length < 6
    const failedTestsCount = failedTests.length

    if (isEmpty) {
      return { status: 'default', message: '' }
    } else if (isShort) {
      return { status: 'red', message: 'Too short' }
    } else if (failedTestsCount > 3) {
      return { status: 'deep-orange', message: 'Easily cracked' }
    } else if (failedTestsCount > 2) {
      return { status: 'orange', message: 'Bit weak' }
    } else if (failedTestsCount > 1) {
      return { status: 'lime', message: 'Not bad' }
    } else if (failedTestsCount > 0) {
      return { status: 'light-green', message: 'Pretty good' }
    }

    return { status: 'blue', message: '' }
  }

  isConfirmed = (password, passwordConfirm, status) => {
    const isMatch = (passwordConfirm === password)
    const isPasswordEntered = (status === 'blue')

    return (isPasswordEntered && isMatch)
  }
}

PasswordField.propTypes = {
  onPasswordChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  /* optional */
  onPasswordConfirmChange: PropTypes.func,
  placeholder: PropTypes.string,
  passwordConfirm: PropTypes.string,
  passwordError: PropTypes.string,
  passwordConfirmError: PropTypes.string,
  withConfirm: PropTypes.bool,
}

PasswordField.defaultProps = {
  onPasswordConfirmChange: () => {},
  placeholder: 'Password',
  passwordConfirm: '',
  passwordError: '',
  passwordConfirmError: '',
  withConfirm: false,
}

export default PasswordField
