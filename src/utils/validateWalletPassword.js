// @flow

import testKeystorePassword from './testKeystorePassword'

import { InvalidFieldError } from './errors'

const validateWalletPassword = (password: Password, passwordConfirm: Password) => {
  testKeystorePassword(password)

  if (password !== passwordConfirm) {
    throw new InvalidFieldError('passwordConfirm', i18n('general.error.passwordConfirm.notMatched'))
  }
}

export default validateWalletPassword
