import React, { Component } from 'react'
import PropTypes from 'prop-types'

import handleEnterKeyPress from 'utils/handleEnterKeyPress'

import config from 'config'

import SubmitModalButton from '../Button'

const PASSWORD_BUTTON_STATES = {
  RESET: -1,
  TITLE: 0,
  PASSWORD: 1,
}

class SubmitModalPasswordButton extends Component {
  render = () => {
    return (
      <div className='modal-button password-button'>
        {this.renderInput()}
        {this.renderButton()}
      </div>
    )
  }

  renderInput = () => {
    const { password, buttonState } = this.props

    if (this.isTitleState(buttonState)) {
      return null
    }

    return (
      <input
        onChange={this.setPassword}
        onBlur={this.reset}
        onKeyPress={handleEnterKeyPress(this.submit)}
        onClick={this.submit}
        type='text'
        className='password-button__input'
        value={password}
        autoFocus
      />
    )
  }

  renderButton = () => {
    const { password, buttonState } = this.props
    const isPasswordEmpty = !password.length
    const isTitleState = this.isTitleState(buttonState)

    if (isPasswordEmpty || isTitleState) {
      return this.renderPasswordButton()
    }

    return this.renderPasswordDots()
  }

  renderPasswordButton = () => {
    const { name, title, iconName, buttonState, disabled, isLoading } = this.props
    const isTitleState = this.isTitleState(buttonState)

    return (
      <SubmitModalButton
        onPress={this.submit}
        name={isTitleState ? name : 'password'}
        title={isTitleState ? title : 'Type your password'}
        iconName={isTitleState ? iconName : 'pin'}
        disabled={disabled}
        isLoading={isLoading}
      />
    )
  }

  renderPasswordDots = () => {
    const { password, isError } = this.props
    const passwordLength = password.length

    let dotsModifier = ''

    if (passwordLength > 25) {
      dotsModifier = 'password-button__dots--25'
    } else if (passwordLength > 20) {
      dotsModifier = 'password-button__dots--20'
    } else if (passwordLength > 15) {
      dotsModifier = 'password-button__dots--15'
    }

    if (isError) {
      dotsModifier = 'password-button__dots--error'
    }

    return (
      <div className={`password-button__dots ${dotsModifier}`} onClick={this.submit}>
        {password.split('').map((_, i) => <div key={i} className='password-button__dot' />)}
      </div>
    )
  }

  reset = () => {
    const { setButtonState, setPassword } = this.props

    setButtonState(PASSWORD_BUTTON_STATES.RESET)
    setPassword('')
  }

  setPassword = (e) => {
    const password = e.target.value

    if (password.length > config.maxPasswordLength) {
      return
    }

    this.props.setPassword(password)
  }

  submit = () => this.props.setButtonState(this.props.buttonState)
  isTitleState = state => (state === PASSWORD_BUTTON_STATES.TITLE)
}

SubmitModalPasswordButton.propTypes = {
  setButtonState: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  buttonState: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
}

SubmitModalPasswordButton.STATES = PASSWORD_BUTTON_STATES

export default SubmitModalPasswordButton
