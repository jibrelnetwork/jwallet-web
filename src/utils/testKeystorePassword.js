// @flow

import Keystore from 'jwallet-web-keystore'

import { InvalidFieldError } from './errors'

const testKeystorePassword = (password: Password) => {
  const error = Keystore.testPassword(password).errors[0]

  if (error) {
    throw new InvalidFieldError('password', error)
  }
}

export default testKeystorePassword
