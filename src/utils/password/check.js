// @flow

import { checkPassword, getPasswordOptions } from 'utils/encryption'
import { selectWalletsPersist } from 'store/selectors/wallets'

export default function isValidatePassword(state: AppState, password: string): boolean {
  const { testPasswordData, passwordOptions } = selectWalletsPersist(state)
  if (!testPasswordData) {
    throw new Error('Encrypted data of wallet is corrupted')
  }

  const passwordOpts: PasswordOptions = getPasswordOptions(passwordOptions)
  try {
    checkPassword(testPasswordData, password, passwordOpts)
  } catch (e) {
    return false
  }
  return true
}
