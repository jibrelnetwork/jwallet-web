// @flow strict

import React, { Component } from 'react'
import { Field } from 'react-final-form'
import { type I18n } from '@lingui/core'

import { useI18n } from 'app/hooks'
import { PasswordInput } from 'components'
import { checkPasswordStrength } from 'utils/encryption'

import {
  Indicator,
  type IndicatorStatus,
} from './components/Indicator'

import styles from './newPasswordField.m.scss'
import { STATUS_MESSAGE_MAP } from './statusMessageMap'

type Props = {|
  +onChange: FormFieldChange,
  +onScoreChange: (boolean) => void,
  +values: FormFields,
  +label: string,
  +labelConfirm: string,
  +isDisabled: boolean,
  +isAutoFocus: boolean,
|}

type StateProps = {|
  +passwordResult: ?PasswordResult,
  +isFetching: boolean,
  +isInitialised: boolean,
|}

const MIN_PASSWORD_STRENGTH_SCORE: number = 3

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

export class NewPasswordFieldView extends Component<Props, StateProps> {
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
      this.props.onScoreChange(false)
    }

    this.props.onChange('passwordNew', password)
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
      labelConfirm,
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
      <div className={styles.core}>
        <Field
          component={PasswordInput}
          onChange={this.handleChange}
          label={label}
          infoMessage={infoMessage}
          errorMessage={errorMessage}
          value={values.password || ''}
          name='password'
          theme='white-indicator'
          maxLength={100}
          isDisabled={isDisabled}
          isAutoFocus={isAutoFocus}
        />
        {!isDisabled && <Indicator status={status} />}
        <Field
          component={PasswordInput}
          label={labelConfirm}
          value={values.passwordConfirm || ''}
          theme='white-icon'
          name='passwordConfirm'
          maxLength={100}
          isDisabled={isDisabled}
        />
      </div>
    )
  }
}

export function NewPasswordField(props: Props) {
  const i18n: I18n = useI18n()

  return (
    <NewPasswordFieldView
      {...props}
      labelConfirm={i18n._(
        'common.NewPasswordField.input.passwordConfirm.title',
        null,
        { defaults: 'Repeat Security Password' },
      )}
    />
  )
}
