import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Keystore from 'jwallet-web-keystore'

import config from 'config'

import { JIcon, JInput } from 'components/base/__new__'

class PasswordField extends Component {
  constructor(props) {
    super(props)
    this.state = { status: 'default', message: '', isConfirmed: false, isApproved: false }
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
    const { password, passwordPlaceholder, passwordError } = this.props
    const placeholderPassword = i18n('modals.createAccount.placeholder.password')

    return (
      <JInput
        onChange={this.onPasswordChange}
        name='password'
        type='password'
        value={password}
        errorMessage={passwordError}
        placeholder={passwordPlaceholder || placeholderPassword}
      />
    )
  }

  renderPasswordConfirmInput = () => {
    const { passwordConfirm, passwordConfirmPlaceholder, passwordConfirmError } = this.props
    const placeholderPasswordConfirm = i18n('modals.createAccount.placeholder.passwordConfirm')

    return (
      <JInput
        onChange={this.onPasswordConfirmChange}
        type='password'
        name='password-confirm'
        placeholder={passwordConfirmPlaceholder || placeholderPasswordConfirm}
        value={passwordConfirm}
        errorMessage={passwordConfirmError}
      />
    )
  }

  renderPasswordMessage = () => {
    if (!this.props.password.length) {
      return null
    }

    const { isApproved, message } = this.state

    return (
      <div className='password__message'>
        {isApproved ? <JIcon name='checkbox' size='small' /> : message}
      </div>
    )
  }

  renderPasswordConfirmIcon = () => {
    return !this.state.isConfirmed ? null : (
      <div className='password__message'>
        <JIcon name='checkbox' size='small' />
      </div>
    )
  }

  onPasswordChange = (password) => {
    if (password.length > config.maxPasswordLength) {
      return
    }

    const { onPasswordChange, passwordConfirm } = this.props

    onPasswordChange(password)

    const { status, message, isApproved } = this.getStatus(password)
    const isConfirmed = this.isConfirmed(password, passwordConfirm, isApproved)

    this.setState({ status, message, isApproved, isConfirmed })
  }

  onPasswordConfirmChange = (passwordConfirm) => {
    if (passwordConfirm.length > config.maxPasswordLength) {
      return
    }

    const { onPasswordConfirmChange, password } = this.props

    onPasswordConfirmChange(passwordConfirm)

    const isConfirmed = this.isConfirmed(password, passwordConfirm, this.state.isApproved)
    this.setState({ isConfirmed })
  }

  getStatus = (password) => {
    const { failedTests } = Keystore.testPassword(password)
    const isEmpty = !password.length
    const isShort = (password.length < 6)
    const failedTestsCount = failedTests.length

    if (isEmpty) {
      return { status: 'default', message: '', isApproved: false }
    } else if (isShort) {
      return { status: 'red', message: 'Too short', isApproved: false }
    } else if (failedTestsCount > 3) {
      return { status: 'deep-orange', message: 'Easily cracked', isApproved: false }
    } else if (failedTestsCount > 2) {
      return { status: 'orange', message: 'Bit weak', isApproved: false }
    } else if (failedTestsCount > 1) {
      return { status: 'lime', message: 'Not bad', isApproved: false }
    } else if (failedTestsCount > 0) {
      return { status: 'light-green', message: 'Pretty good', isApproved: false }
    }

    return { status: 'blue', message: '', isApproved: true }
  }

  isConfirmed = (password, passwordConfirm, isApproved) => {
    const isMatch = (passwordConfirm === password)

    return (isApproved && isMatch)
  }
}

PasswordField.propTypes = {
  onPasswordChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  /* optional */
  onPasswordConfirmChange: PropTypes.func,
  passwordPlaceholder: PropTypes.string,
  passwordConfirmPlaceholder: PropTypes.string,
  passwordConfirm: PropTypes.string,
  passwordError: PropTypes.string,
  passwordConfirmError: PropTypes.string,
  withConfirm: PropTypes.bool,
}

PasswordField.defaultProps = {
  onPasswordConfirmChange: () => {},
  passwordConfirm: '',
  passwordError: '',
  passwordConfirmError: '',
  passwordPlaceholder: null,
  passwordConfirmPlaceholder: null,
  withConfirm: false,
}

export default PasswordField
