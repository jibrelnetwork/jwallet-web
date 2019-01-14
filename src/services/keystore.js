// @flow

/*
const setPassword = (
  keystore: Keystore,
  password: string,
  newPassword: string,
  passwordOptionsUser?: ?PasswordOptionsUser,
): Keystore => {
  const {
    wallets,
    passwordOptions,
    testPasswordData,
  }: Keystore = keystore

  const passwordOptionsNew: PasswordOptions = utils.getPasswordOptions(passwordOptionsUser)

  const derivedKey: Uint8Array = utils.deriveKeyFromPassword(
    password,
    passwordOptions.salt,
    passwordOptions.scryptParams,
  )

  const testPasswordDataDec: string = utils.decryptData(
    testPasswordData,
    derivedKey,
    passwordOptions.encryptionType,
  )

  const derivedKeyNew: Uint8Array = utils.deriveKeyFromPassword(
    newPassword,
    passwordOptionsNew.salt,
    passwordOptionsNew.scryptParams,
  )

  const testPasswordDataEnc: EncryptedData = utils.encryptData(
    testPasswordDataDec,
    derivedKeyNew,
    passwordOptionsNew.encryptionType,
  )

  const walletsReEnc: Wallets = reEncryptWallets(
    wallets,
    derivedKey,
    derivedKeyNew,
    passwordOptions.encryptionType,
    passwordOptionsNew.encryptionType,
  )

  return {
    wallets: walletsReEnc,
    passwordOptions: passwordOptionsNew,
    testPasswordData: testPasswordDataEnc,
  }
}
*/
