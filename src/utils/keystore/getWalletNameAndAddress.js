// @flow

import keystore from 'services/keystore'

const getWalletNameAndAddress = (walletId: ?WalletId): string => {
  try {
    if (!walletId) {
      return ''
    }

    const { name }: Wallet = keystore.getWallet(walletId)
    const address: Address = keystore.getAddress(walletId)
    const walletName = (name.length > 20) ? `${name.substr(0, 20)}...` : name
    const walletAddr = `${address.substr(0, 6)}...${address.substr(-2)}`

    return `${walletName}   ${walletAddr}`
  } catch (err) {
    return ''
  }
}

export default getWalletNameAndAddress
