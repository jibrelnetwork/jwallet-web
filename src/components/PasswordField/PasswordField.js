// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

import config from 'config'
import { JInput } from 'components/base'
import { checkPasswordStrength } from 'utils/encryption'
import { type JInputColor } from 'components/base/JInput/JInput'

import {
  Indicator,
  type IndicatorStatus,
} from './Indicator/Indicator'

import passwordFieldStyle from './passwordField.m.scss'

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
  isFetching: boolean,
  isInitialised: boolean,
}

const STATUS_MESSAGE_MAP: { [IndicatorStatus]: ?string } = {
  'red': t`Too weak`,
  'green': t`Not bad`,
  'yellow': t`Bit weak`,
  'orange': t`Easily cracked`,
}

function getStatusByScore(
  score: number,
  isFetching: boolean,
): ?IndicatorStatus {
  if (isFetching) {
    return 'fetching'
  }

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

export class PasswordField extends Component<Props, StateProps> {
  static defaultProps = {
    color: 'white',
    isDisabled: false,
    isAutoFocus: false,
  }

  constructor(props: Props) {
    super(props)

    const password: ?string = props.value

    this.state = {
      passwordResult: null,
      isFetching: false,
      isInitialised: false,
    }

    if (password) {
      this.setCheckingPasswordResult(password)
    }
  }

  setCheckingPasswordResult = async (password: string) => {
    const { isInitialised }: StateProps = this.state

    if (!isInitialised) {
      this.setState({ isFetching: true })
    }

    const passwordResult: PasswordResult = await checkPasswordStrength(password)
    this.setState({ passwordResult })

    if (!isInitialised) {
      this.setState({
        isFetching: false,
        isInitialised: true,
      })
    }
  }

  getInfoMessage = (): ?string => {
    if (this.props.isDisabled) {
      return null
    }

    const {
      passwordResult,
      isFetching,
    }: StateProps = this.state

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

    const status: ?IndicatorStatus = getStatusByScore(score, isFetching)
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

    const {
      passwordResult,
      isFetching,
    }: StateProps = this.state

    const score: number = passwordResult ? passwordResult.score : -1
    const status: ?IndicatorStatus = getStatusByScore(score, isFetching)
    const infoMessage: ?string = this.getInfoMessage()

    const errorMessage: ?string = invalidFields.password ||
      (score < config.minPasswordStrengthScore) ? infoMessage : null

    return (
      <div className={passwordFieldStyle.core}>
        <JInput
          onChange={this.handleChange}
          color={color}
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
        {!isDisabled && <Indicator status={status} fieldColor={color} />}
        <JInput
          onChange={onChangeConfirm}
          color={color}
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
