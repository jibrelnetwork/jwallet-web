// @flow

import utils from '@jibrelnetwork/jwallet-web-keystore'

function checkPassword(
  testPasswordData: EncryptedData,
  password: string,
  passwordOptions: PasswordOptions,
): void {
  const {
    salt,
    scryptParams,
    encryptionType,
  }: PasswordOptions = passwordOptions

  const dKey: Uint8Array = utils.deriveKeyFromPassword(password, salt, scryptParams)

  const testPasswordDataDec: ?string = utils.decryptData(
    testPasswordData,
    dKey,
    encryptionType,
  )

  if (!testPasswordDataDec) {
    throw new Error('Password is invalid')
  }
}

export default checkPassword
