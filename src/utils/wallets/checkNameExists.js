// @flow strict

import { t } from 'ttag'

import { walletsPlugin } from 'store/plugins'

export function checkNameExists(name: ?string): ?string {
  const trimmedName: string = (name || '').trim()

  if (!trimmedName) {
    return null
  }

  try {
    walletsPlugin.checkWalletUniqueness(trimmedName, 'name')
  } catch (error) {
    return t`You already have a wallet with this name.`
  }

  return null
}
