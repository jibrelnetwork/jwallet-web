// @flow

import React, { Component } from 'react'

import JInput from 'components/base/JInput'

import checkPasswordStrength from 'utils/encryption/checkPasswordStrength'

import { type JInputColor } from 'components/base/JInput/JInput'

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
  isAutoFocus?: boolean,
  +color: JInputColor,
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
  static defaultProps = {
    color: 'white',
    isAutoFocus: true,
  }

  constructor(props: Props) {
    super(props)

    const password: ?string = props.value

    this.state = {
      passwordResult: password ? checkPasswordStrength(password) : null,
    }
  }

  onChange = (password: string) => {
    this.setState({
      passwordResult: password ? checkPasswordStrength(password) : null,
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
      isAutoFocus,
      color,
    }: Props = this.props

    return (
      <div className='password-field'>
        <JInput
          color={color}
          onChange={this.onChange}
          value={value}
          placeholder={placeholder}
          errorMessage={invalidFields.password}
          infoMessage={this.getInfoMessage()}
          type='password'
          name='password'
          isDisabled={isDisabled}
          isAutoFocus={isAutoFocus}
        />
        <Indicator status={this.getStatus()} isOffsetRight={isDisabled} color={color} />
        <JInput
          color={color}
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
