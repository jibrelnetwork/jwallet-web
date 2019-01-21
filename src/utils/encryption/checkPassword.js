// @flow

import {
  decryptData,
  deriveKeyFromPassword,
} from 'utils/encryption'

function checkPassword(
  testPasswordData: EncryptedData,
  password: string,
  passwordOptions: PasswordOptions,
): void {
  const {
    salt,
    scryptParams,
    encryptionType,
    derivedKeyLength,
  }: PasswordOptions = passwordOptions

  const testPasswordDataDec: ?string = decryptData({
    encryptionType,
    data: testPasswordData,
    derivedKey: deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt),
  })

  if (!testPasswordDataDec) {
    throw new Error('Password is invalid')
  }
}

export default checkPassword
