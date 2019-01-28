import { selectActiveWalletId } from 'store/selectors/wallets'

export const selectedWallet = (state, pathname) => {
  if (
    /^\/agreement/.test(pathname) ||
    // all /wallets/* except /wallets/addresses
    (
      /^\/wallets/.test(pathname) &&
      !/^\/wallets\/addresses/.test(pathname)
    )
  ) {
    // skip for selected paths
    return pathname
  }

  if (!selectActiveWalletId(state)) {
    return '/wallets'
  }

  return pathname
}
