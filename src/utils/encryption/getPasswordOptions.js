// @flow

import config from 'config'

import generateSalt from './generateSalt'

function getPasswordOptions(passwordHint: string): PasswordOptions {
  return {
    passwordHint: passwordHint || '',
    scryptParams: config.defaultScryptParams,
    encryptionType: config.defaultEncryptionType,
    saltBytesCount: config.defaultSaltBytesCount,
    salt: generateSalt(config.defaultSaltBytesCount),
    derivedKeyLength: config.defaultDerivationKeyLength,
  }
}

export default getPasswordOptions
