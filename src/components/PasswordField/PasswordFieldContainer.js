// @flow

import Keystore from '@jibrelnetwork/jwallet-web-keystore'
import { compose } from 'ramda'
import { withHandlers, withStateHandlers } from 'recompose'

import config from 'config'

import PasswordField from './PasswordField'

const checkConfirmed = (
  password: Password,
  passwordConfirm: Password,
  isApproved: boolean,
): boolean => (isApproved && (passwordConfirm === password))

const getStatus = (password: Password): {
  status: string,
  failedTest: string,
  isApproved: boolean,
} => {
  const { errors }: Object = Keystore.testPassword(password)
  const isEmpty: boolean = !password.length
  const failedTestsCount: number = errors.length

  if (isEmpty) {
    return { status: '', failedTest: '', isApproved: false }
  } else if (failedTestsCount > 3) {
    return { status: 'red', failedTest: errors[0], isApproved: false }
  } else if (failedTestsCount > 2) {
    return { status: 'orange', failedTest: errors[0], isApproved: false }
  } else if (failedTestsCount > 0) {
    return { status: 'yellow', failedTest: errors[0], isApproved: false }
  }

  return { status: 'green', failedTest: '', isApproved: true }
}

type Props = {
  onPasswordChange: Function,
  onPasswordConfirmChange: Function,
  onChange: Function,
  onConfirmChange: Function,
  setStatus: Function,
  setFailedTest: Function,
  setApproved: Function,
  setConfirmed: Function,
  status: string,
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
      status: '',
      failedTest: '',
      isApproved: false,
      isConfirmed: false,
    }),
    {
      setStatus: () => (status: string) => ({ status }),
      setFailedTest: () => (failedTest: string) => ({ failedTest }),
      setApproved: () => (isApproved: boolean) => ({ isApproved }),
      setConfirmed: () => (isConfirmed: boolean) => ({ isConfirmed }),
    },
  ),
  withHandlers({
    onChange: ({
      onPasswordChange,
      setStatus,
      setFailedTest,
      setApproved,
      setConfirmed,
      passwordConfirm,
    }: Props) => (password: Password) => {
      if (password.length > config.maxPasswordLength) {
        return
      }

      onPasswordChange(password)

      const { status, failedTest, isApproved } = getStatus(password)
      const isConfirmed: boolean = checkConfirmed(password, passwordConfirm, isApproved)

      setStatus(status)
      setFailedTest(failedTest)
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
