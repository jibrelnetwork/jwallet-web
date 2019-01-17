// @flow

import keystore from 'services/keystore'
import utils from '@jibrelnetwork/jwallet-web-keystore'
import { selectWalletsPersist } from 'store/selectors/wallets'

export default function checkPassword(state: AppState, password: string): boolean {
  const { testPasswordData, passwordOptions } = selectWalletsPersist(state)
  if (!testPasswordData) {
    throw new Error('Encrypted data of wallet is corrupted')
  }

  const passwordOpts: PasswordOptions = utils.getPasswordOptions(passwordOptions)
  try {
    keystore.checkPassword(testPasswordData, password, passwordOpts)
  } catch (e) {
    return false
  }
  return true
}
