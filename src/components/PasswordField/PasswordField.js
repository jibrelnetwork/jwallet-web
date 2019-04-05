// @flow

import React, { Component } from 'react'
import { t } from 'ttag'
import { Field } from 'react-final-form'

import config from 'config'
import { JInputField } from 'components/base'
import { checkPasswordStrength } from 'utils/encryption'

import {
  Indicator,
  type IndicatorStatus,
} from './components/Indicator'

import passwordFieldStyle from './passwordField.m.scss'

type InputChangeHandler = (string, string) => void

type Props = {|
  +onChange: InputChangeHandler,
  +errors: FormFields,
  +values: FormFields,
  +label: string,
  +isDisabled: boolean,
  +isAutoFocus: boolean,
|}

type StateProps = {|
  +passwordResult: ?PasswordResult,
  +isFetching: boolean,
  +isInitialised: boolean,
|}

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
    isDisabled: false,
    isAutoFocus: false,
  }

  constructor(props: Props) {
    super(props)

    const { password }: FormFields = props.values

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

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const password: string = event.target.value

    if (password) {
      this.setCheckingPasswordResult(password)
    } else {
      this.setState({ passwordResult: null })
    }

    this.props.onChange('password', password)
  }

  render() {
    const {
      errors,
      values,
      label,
      isDisabled,
      isAutoFocus,
    }: Props = this.props

    const {
      passwordResult,
      isFetching,
    }: StateProps = this.state

    const infoMessage: ?string = this.getInfoMessage()
    const score: number = passwordResult ? passwordResult.score : -1
    const status: ?IndicatorStatus = getStatusByScore(score, isFetching)

    const errorMessage: ?string = errors.password ||
      (score < config.minPasswordStrengthScore) ? infoMessage : null

    return (
      <div className={passwordFieldStyle.core}>
        <Field
          component={JInputField}
          onChange={this.handleChange}
          label={label}
          value={values.password}
          infoMessage={infoMessage}
          errorMessage={errorMessage}
          type='password'
          name='password'
          isDisabled={isDisabled}
          isAutoFocus={isAutoFocus}
        />
        {!isDisabled && <Indicator status={status} />}
        <Field
          component={JInputField}
          value={values.passwordConfirm}
          label={t`Repeat Security Password`}
          errorMessage={errors.passwordConfirm}
          type='password'
          name='passwordConfirm'
          isDisabled={isDisabled}
        />
      </div>
    )
  }
}
