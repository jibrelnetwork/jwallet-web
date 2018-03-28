// @flow

import Keystore from 'jwallet-web-keystore'
import { compose } from 'ramda'
import { withHandlers, withStateHandlers } from 'recompose'

import config from 'config'

import PasswordField from './PasswordField'

const checkConfirmed = (
  password: Password,
  passwordConfirm: Password,
  isApproved: boolean,
): boolean => (isApproved && (passwordConfirm === password))

const getStatus = (password: Password): { message: string, isApproved: boolean } => {
  const { failedTests } = Keystore.testPassword(password)
  const isEmpty = !password.length
  const isShort = (password.length < 6)
  const failedTestsCount = failedTests.length

  if (isEmpty) {
    return { message: '', isApproved: false }
  } else if (isShort) {
    return { message: 'Too short', isApproved: false }
  } else if (failedTestsCount > 2) {
    return { message: 'Easily cracked', isApproved: false }
  } else if (failedTestsCount > 1) {
    return { message: 'Bit weak', isApproved: false }
  } else if (failedTestsCount > 0) {
    return { message: 'Not bad', isApproved: false }
  }

  return { message: '', isApproved: true }
}

type Props = {
  onPasswordChange: Function,
  onPasswordConfirmChange: Function,
  onChange: Function,
  onConfirmChange: Function,
  setMessage: Function,
  setApproved: Function,
  setConfirmed: Function,
  message: string,
  password: string,
  passwordPlaceholder: string,
  passwordError: string,
  passwordConfirm: string,
  passwordConfirmPlaceholder: string,
  passwordConfirmError: string,
  withConfirm: boolean,
  isConfirmed: boolean,
  isApproved: boolean,
}

export default compose(
  withStateHandlers(
    () => ({
      message: '',
      isApproved: false,
      isConfirmed: false,
    }),
    {
      setMessage: () => (message: string) => ({ message }),
      setApproved: () => (isApproved: boolean) => ({ isApproved }),
      setConfirmed: () => (isConfirmed: boolean) => ({ isConfirmed }),
    },
  ),
  withHandlers({
    onChange: ({
      onPasswordChange,
      setMessage,
      setApproved,
      setConfirmed,
      passwordConfirm,
    }: Props) => (password: Password) => {
      if (password.length > config.maxPasswordLength) {
        return
      }

      onPasswordChange(password)

      const { message, isApproved } = getStatus(password)
      const isConfirmed: boolean = checkConfirmed(password, passwordConfirm, isApproved)

      setMessage(message)
      setApproved(isApproved)
      setConfirmed(isConfirmed)
    },
    onConfirmChange: ({
      onPasswordConfirmChange,
      setConfirmed,
      password,
      isApproved,
    }: Props) => (passwordConfirm: Password) => {
      if (passwordConfirm.length > config.maxPasswordLength) {
        return
      }

      onPasswordConfirmChange(passwordConfirm)

      const isConfirmed = checkConfirmed(password, passwordConfirm, isApproved)
      setConfirmed(isConfirmed)
    },
  }),
)(PasswordField)
