// @flow

import keystore from 'services/keystore'

function getWalletNameAndAddress(walletId: ?WalletId): string {
  if (!walletId) {
    return ''
  }

  try {
    const { name }: Wallet = keystore.getWallet(walletId)
    const address: Address = keystore.getAddress(walletId)
    const walletName: string = (name.length > 20) ? `${name.substr(0, 20)}...` : name
    const walletAddr: string = `${address.substr(0, 6)}...${address.substr(-2)}`

    return `${walletName}   ${walletAddr}`
  } catch (err) {
    return ''
  }
}

export default getWalletNameAndAddress
