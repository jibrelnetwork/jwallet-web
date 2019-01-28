import { selectActiveWallet } from 'store/selectors/wallets'
import { checkMnemonicType } from 'utils/wallets'

export const walletsAddresses = (state, pathname) => {
  if (
    !/^\/wallets\/addresses$/.test(pathname)
  ) {
    // skip for all except selected paths
    return pathname
  }

  const activeWallet = selectActiveWallet(state)
  if (activeWallet && !checkMnemonicType(activeWallet.type)) {
    return '/digital-assets/grid'
  }

  return pathname
}
