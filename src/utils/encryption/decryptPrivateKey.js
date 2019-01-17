// @flow

import {
  decryptData,
  deriveKeyFromPassword,
} from '.'

function decryptPrivateKey(
  privateKey: EncryptedData,
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
    data: privateKey,
  })
}

export default decryptPrivateKey
