// @flow

import config from 'config'

import generateSalt from './generateSalt'

function getPasswordOptions(options: ?PasswordOptionsUser): PasswordOptions {
  const saltBytesCount: number = !options
    ? config.defaultSaltBytesCount
    : options.saltBytesCount || config.defaultSaltBytesCount

  const salt: string = generateSalt(saltBytesCount)

  return !options ? {
    salt,
    saltBytesCount,
    passwordHint: '',
    scryptParams: config.defaultScryptParams,
    encryptionType: config.defaultEncryptionType,
    derivedKeyLength: config.defaultDerivationKeyLength,
  } : {
    saltBytesCount,
    salt: options.salt || salt,
    passwordHint: options.passwordHint || '',
    scryptParams: options.scryptParams || config.defaultScryptParams,
    encryptionType: options.encryptionType || config.defaultEncryptionType,
    derivedKeyLength: options.derivedKeyLength || config.defaultDerivationKeyLength,
  }
}

export default getPasswordOptions
