// @flow

import { selectActiveWallet } from 'store/selectors/wallets'

export const readonly = (state: AppState, pathname: string): string => {
  if (
    !/^\/digital-assets\/send/.test(pathname) &&
    !/^\/wallets\/backup/.test(pathname)
  ) {
    // skip for all except selected paths
    return pathname
  }

  const activeWallet = selectActiveWallet(state)
  if (activeWallet && activeWallet.isReadOnly) {
    return '/upgrade'
  }

  return pathname
}
