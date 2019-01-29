// @flow

import { selectWalletsItems } from 'store/selectors/wallets'

export const firstTime = (state: AppState, pathname: string): string => {
  if (
    /^\/agreement/.test(pathname) ||
    /^\/wallets\/create/.test(pathname) ||
    /^\/wallets\/import/.test(pathname) ||
    /^\/wallets\/start/.test(pathname)
  ) {
    // skip for selected paths
    return pathname
  }

  if (selectWalletsItems(state).length === 0) {
    return '/wallets/start'
  }

  return pathname
}
