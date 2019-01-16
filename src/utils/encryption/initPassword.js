// @flow

import config from 'config'

import {
  encryptData,
  generateSalt,
  deriveKeyFromPassword,
} from 'utils/encryption'

import testPassword from './testPassword'

function initPassword(password: string, passwordOptions: PasswordOptions): EncryptedData {
  testPassword(password)

  const {
    salt,
    scryptParams,
    encryptionType,
    derivedKeyLength,
  }: PasswordOptions = passwordOptions

  return encryptData({
    encryptionType,
    data: generateSalt(config.encryptedDataLength),
    derivedKey: deriveKeyFromPassword(password, scryptParams, derivedKeyLength, salt),
  })
}

export default initPassword
