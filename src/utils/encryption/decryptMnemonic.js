// @flow

import {
  decryptData,
  deriveKeyFromPassword,
} from '.'

function decryptMnemonic(
  mnemonic: EncryptedData,
  password: string,
  passwordOptions: PasswordOptions,
): string {
  const {
    salt,
    scryptParams,
    encryptionType,
    derivedKeyLength,
  }: PasswordOptions = passwordOptions

  const derivedKey: Uint8Array = deriveKeyFromPassword(
    password,
    scryptParams,
    derivedKeyLength,
    salt,
  )

  return decryptData({
    derivedKey,
    encryptionType,
    data: mnemonic,
  })
}

export default decryptMnemonic
