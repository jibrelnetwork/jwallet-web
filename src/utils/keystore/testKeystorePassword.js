// @flow

import Keystore from '@jibrelnetwork/jwallet-web-keystore'

import InvalidFieldError from 'utils/errors/InvalidFieldError'

function testKeystorePassword(password: string) {
  const error: ?string = Keystore.testPassword(password).errors[0]

  if (error) {
    throw new InvalidFieldError('password', error)
  }
}

export default testKeystorePassword
