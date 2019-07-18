// @flow strict

import { i18n } from 'i18n/lingui'

import { walletsPlugin } from 'store/plugins'

export function checkNameExists(name: ?string): ?string {
  const trimmedName: string = (name || '').trim()

  if (!trimmedName) {
    return null
  }

  try {
    walletsPlugin.checkWalletUniqueness(trimmedName, 'name')
  } catch (error) {
    return i18n._(
      'Wallets.errors.duplicateName',
      null,
      { defaults: 'You already have a wallet with this name.' },
    )
  }

  return null
}
