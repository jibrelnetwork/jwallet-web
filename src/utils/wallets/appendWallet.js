// @flow

function appendWallet(wallets: Wallets, wallet: Wallet): Wallets {
  return [
    ...wallets,
    wallet,
  ]
}

export default appendWallet
