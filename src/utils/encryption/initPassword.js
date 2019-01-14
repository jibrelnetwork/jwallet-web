// @flow

import utils from '@jibrelnetwork/jwallet-web-keystore'

import config from 'config'

import testPassword from './testPassword'

function initPassword(
  password: string,
  passwordOptions: PasswordOptions,
): EncryptedData {
  testPassword(password)

  const {
    salt,
    scryptParams,
    encryptionType,
  }: PasswordOptions = passwordOptions

  const testPasswordData: string = utils.generateSalt(config.testPasswordDataLength)
  const dKey: Uint8Array = utils.deriveKeyFromPassword(password, salt, scryptParams)

  const testPasswordDataEnc: EncryptedData = utils.encryptData(
    testPasswordData,
    dKey,
    encryptionType,
  )

  return testPasswordDataEnc
}

export default initPassword
