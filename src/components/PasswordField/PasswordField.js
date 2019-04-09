// @flow

import React, { Component } from 'react'
import { t } from 'ttag'
import { Field } from 'react-final-form'

import { PasswordInput } from 'components'
import { checkPasswordStrength } from 'utils/encryption'

import {
  Indicator,
  type IndicatorStatus,
} from './components/Indicator'

import passwordFieldStyle from './passwordField.m.scss'

type Props = {|
  +onChange: FormFieldChange,
  +onScoreChange: (boolean) => void,
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

const MIN_PASSWORD_STRENGTH_SCORE: number = 3

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

function checkStrong(score: number): boolean {
  return (score >= MIN_PASSWORD_STRENGTH_SCORE)
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
    this.handleScoreChange(passwordResult)
    this.setState({ passwordResult })

    if (!isInitialised) {
      this.setState({
        isFetching: false,
        isInitialised: true,
      })
    }
  }

  getMessage = (): ?string => {
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

  handleScoreChange = (newPasswordResult: PasswordResult) => {
    const { passwordResult } = this.state

    if (!passwordResult || (newPasswordResult.score !== passwordResult.score)) {
      this.props.onScoreChange(checkStrong(newPasswordResult.score))
    }
  }

  render() {
    const {
      values,
      label,
      isDisabled,
      isAutoFocus,
    }: Props = this.props

    const {
      passwordResult,
      isFetching,
    }: StateProps = this.state

    const infoMessage: ?string = this.getMessage()
    const score: number = passwordResult ? passwordResult.score : -1
    const status: ?IndicatorStatus = getStatusByScore(score, isFetching)
    const isStrong: boolean = checkStrong(score)
    const errorMessage: ?string = isStrong ? null : infoMessage

    return (
      <div className={passwordFieldStyle.core}>
        <Field
          component={PasswordInput}
          onChange={this.handleChange}
          label={label}
          value={values.password}
          infoMessage={infoMessage}
          errorMessage={errorMessage}
          name='password'
          theme='white-indicator'
          isDisabled={isDisabled}
          isAutoFocus={isAutoFocus}
        />
        {!isDisabled && <Indicator status={status} />}
        <Field
          component={PasswordInput}
          value={values.passwordConfirm}
          label={t`Repeat Security Password`}
          theme='white-icon'
          name='passwordConfirm'
          isDisabled={isDisabled}
        />
      </div>
    )
  }
}
