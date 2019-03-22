// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

import config from 'config'
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
  +isAutoFocus: boolean,
  +color: JInputColor,
|}

type StateProps = {
  passwordResult: ?PasswordResult,
}

const STATUS_MESSAGE_MAP: { [PasswordStatus]: string } = {
  'red': t`Too weak`,
  'green': t`Not bad`,
  'yellow': t`Bit weak`,
  'orange': t`Easily cracked`,
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
      passwordResult: null,
    }

    if (password) {
      this.setCheckingPasswordResult(password)
    }
  }

  setCheckingPasswordResult = (password: string) => {
    checkPasswordStrength(password).then((passwordResult: PasswordResult) => {
      this.setState({ passwordResult })
    })
  }

  getInfoMessage = (): ?string => {
    if (this.props.isDisabled) {
      return null
    }

    const { passwordResult }: StateProps = this.state

    if (!passwordResult) {
      return null
    }

    /**
     * For field descriptions please refer to https://github.com/dropbox/zxcvbn
     */
    const {
      score,
      feedback,
    }: PasswordResult = passwordResult

    const {
      warning,
      suggestions,
    } = feedback

    const status: ?PasswordStatus = getStatusByScore(score)
    const statusMessage: ?string = status ? STATUS_MESSAGE_MAP[status] : null

    return warning || suggestions[0] || statusMessage
  }

  handleChange = (password: string) => {
    if (password) {
      this.setCheckingPasswordResult(password)
    } else {
      this.setState({ passwordResult: null })
    }

    this.props.onChange(password)
  }

  render() {
    const {
      onChangeConfirm,
      invalidFields,
      color,
      value,
      placeholder,
      valueConfirm,
      placeholderConfirm,
      isDisabled,
      isAutoFocus,
    }: Props = this.props

    const { passwordResult }: StateProps = this.state
    const score: number = passwordResult ? passwordResult.score : 0
    const status: ?PasswordStatus = passwordResult ? getStatusByScore(score) : null
    const infoMessage: ?string = this.getInfoMessage()

    const errorMessage: ?string = invalidFields.password ||
      (score < config.minPasswordStrengthScore) ? infoMessage : null

    return (
      <div className='password-field'>
        <JInput
          color={color}
          onChange={this.handleChange}
          value={value}
          placeholder={placeholder}
          infoMessage={infoMessage}
          errorMessage={errorMessage}
          type='password'
          name='password'
          withIndicator
          isDisabled={isDisabled}
          isAutoFocus={isAutoFocus}
        />
        {!isDisabled && <Indicator status={status} color={color} />}
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
