// @flow

import React, { Component } from 'react'

import JInput from 'components/base/JInput'
import keystore from 'services/keystore'

import Indicator from './Indicator'

type InputChangeHandler = (string) => void

type Props = {|
  +onChange: InputChangeHandler,
  +onChangeConfirm: ?InputChangeHandler,
  +invalidFields: FormFields,
  +value: string,
  +placeholder: string,
  +valueConfirm: ?string,
  +placeholderConfirm: string,
  +isDisabled: boolean,
|}

type StateProps = {
  passwordResult: ?PasswordResult,
}

const STATUS_MESSAGE_MAP: { [PasswordStatus]: string } = {
  'red': 'Too weak',
  'green': 'Not bad',
  'yellow': 'Bit weak',
  'orange': 'Easily cracked',
}

function getStatusByScore(score: number): ?PasswordStatus {
  switch (score) {
    case 0:
      return 'red'
    case 1:
      return 'red'
    case 2:
      return 'orange'
    case 3:
      return 'yellow'
    case 4:
      return 'green'
    default:
      return null
  }
}

class PasswordField extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    const password: ?string = props.value

    this.state = {
      passwordResult: password ? keystore.getPasswordStrength(password) : null,
    }
  }

  onChange = (password: string) => {
    this.setState({
      passwordResult: password ? keystore.getPasswordStrength(password) : null,
    })

    this.props.onChange(password)
  }

  getInfoMessage = (): ?string => {
    const { passwordResult }: StateProps = this.state

    if (!passwordResult) {
      return null
    }

    /**
     * For field descriptions please refer to https://github.com/dropbox/zxcvbn
     */
    const { score, feedback }: PasswordResult = passwordResult
    const { warning, suggestions } = feedback
    const status: ?PasswordStatus = getStatusByScore(score)
    const statusMessage: ?string = status ? STATUS_MESSAGE_MAP[status] : null

    return warning || suggestions[0] || statusMessage
  }

  getStatus = () => {
    const { passwordResult }: StateProps = this.state

    return passwordResult ? getStatusByScore(passwordResult.score) : null
  }

  render() {
    const {
      onChangeConfirm,
      invalidFields,
      value,
      placeholder,
      valueConfirm,
      placeholderConfirm,
      isDisabled,
    }: Props = this.props

    return (
      <div className='password-field'>
        <JInput
          onChange={this.onChange}
          value={value}
          placeholder={placeholder}
          errorMessage={invalidFields.password}
          infoMessage={this.getInfoMessage()}
          type='password'
          name='password'
          isDisabled={isDisabled}
          isAutoFocus
        />
        <Indicator status={this.getStatus()} />
        <JInput
          onChange={onChangeConfirm}
          value={valueConfirm}
          placeholder={placeholderConfirm}
          errorMessage={invalidFields.passwordConfirm}
          type='password'
          name='password-confirm'
          isDisabled={isDisabled}
        />
      </div>
    )
  }
}

export default PasswordField
