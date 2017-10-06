import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Keystore from 'blockchain-wallet-keystore'

import { JIcon, JTextInput } from 'components/base'

class PasswordField extends Component {
  constructor(props) {
    super(props)
    this.state = { status: 'default', message: '' }
  }

  render() {
    return (
      <div className={`password password--${this.state.status}`}>
        {this.renderPasswordInput()}
        {this.renderPasswordMessage()}
      </div>
    )
  }

  renderPasswordInput = () => {
    const { onPasswordChange, password, ...otherProps } = this.props // eslint-disable-line

    return (
      <JTextInput
        {...otherProps}
        onValueChange={this.onPasswordChange}
        name='password'
        placeholder='Password'
        value={password}
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

  onPasswordChange = (password) => {
    this.props.onPasswordChange(password)
    this.updateStatus(password)
  }

  updateStatus = (password) => {
    const { failedTests } = Keystore.testPassword(password)
    const isEmpty = !password.length
    const isShort = password.length < 6
    const failedTestsCount = failedTests.length

    if (isEmpty) {
      return this.setState({ status: 'default', message: '' })
    } else if (isShort) {
      return this.setState({ status: 'red', message: 'Too short' })
    } else if (failedTestsCount > 3) {
      return this.setState({ status: 'deep-orange', message: 'Easily cracked' })
    } else if (failedTestsCount > 2) {
      return this.setState({ status: 'orange', message: 'Bit weak' })
    } else if (failedTestsCount > 1) {
      return this.setState({ status: 'lime', message: 'Not bad' })
    } else if (failedTestsCount > 0) {
      return this.setState({ status: 'light-green', message: 'Pretty good' })
    }

    return this.setState({ status: 'blue', message: '' })
  }
}

PasswordField.propTypes = {
  onPasswordChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
}

export default PasswordField
