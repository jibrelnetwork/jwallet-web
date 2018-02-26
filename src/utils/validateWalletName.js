// @flow

import { equals, isEmpty, toLower } from 'ramda'

import { InvalidFieldError } from './errors'

const validateWalletName = (name: string, wallets: Wallets) => {
  if (!name) {
    throw new InvalidFieldError('name', i18n('general.error.name.empty'))
  }

  if (/[^a-z0-9 ]/ig.test(name)) {
    throw new InvalidFieldError('name', i18n('general.error.name.invalid'))
  }

  validateNameUniq(name, wallets)
}

const validateNameUniq = (name: string, wallets: Wallets) => {
  if (isEmpty(wallets)) {
    return
  }

  wallets.forEach((wallet: Wallet) => {
    const newKeyName: string = toLower(name.trim())
    const isEqual: boolean = equals(newKeyName, toLower(wallet.name))

    if (isEqual) {
      throw new InvalidFieldError('name', i18n('general.error.name.exists'))
    }
  })
}

export default validateWalletName
