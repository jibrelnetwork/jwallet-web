// @flow

import { checkMnemonicType } from 'utils/wallets'
import decryptData from './decryptData'
import encryptData from './encryptData'
import deriveKeyFromPassword from './deriveKeyFromPassword'
import getPasswordOptions from './getPasswordOptions'

export default function reEncryptWallet(
  wallet: Wallet,
  passwordOld: string,
  passwordNew: string,
  passwordOptionsNew: PasswordOptions,
): Wallet {
  const {
    type,
    encrypted,
    isReadOnly,
    passwordOptions,
  }: Wallet = wallet

  if (isReadOnly) {
    return wallet
  }

  const {
    scryptParams,
    derivedKeyLength,
    salt,
    encryptionType,
  } = getPasswordOptions(passwordOptions)

  const {
    scryptParams: scryptParamsNew,
    derivedKeyLength: derivedKeyLengthNew,
    salt: saltNew,
    encryptionType: newEncryptionType,
  } = passwordOptionsNew

  const derivedKey = deriveKeyFromPassword(passwordOld, scryptParams, derivedKeyLength, salt)
  const newDerivedKey = deriveKeyFromPassword(
    passwordNew,
    scryptParamsNew,
    derivedKeyLengthNew,
    saltNew
  )

  if (checkMnemonicType(type) && encrypted.mnemonic) {
    const mnemonicDec: string = decryptData({
      data: encrypted.mnemonic,
      derivedKey,
      encryptionType,
    })

    return {
      ...wallet,
      encrypted: {
        ...encrypted,
        mnemonic: encryptData({
          data: mnemonicDec,
          derivedKey: newDerivedKey,
          encryptionType: newEncryptionType,
        }),
      },
    }
  } else if (!checkMnemonicType(type) && encrypted.privateKey) {
    const privateKeyDec: string = decryptData({
      data: encrypted.privateKey,
      derivedKey,
      encryptionType,
    })

    return {
      ...wallet,
      encrypted: {
        ...encrypted,
        privateKey: encryptData({
          data: privateKeyDec,
          derivedKey: newDerivedKey,
          encryptionType: newEncryptionType,
        }),
      },
    }
  }

  throw new Error('WalletDataError')
}
