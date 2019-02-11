// @flow

function appendWallet(wallets: Wallets, wallet: Wallet): Wallets {
  /* eslint-disable-next-line fp/no-mutating-methods */
  return [
    ...wallets,
    wallet,
  ].sort((a: Wallet, b: Wallet): number => {
    if (a.orderIndex === b.orderIndex) {
      return 0
    }

    return (a.orderIndex > b.orderIndex) ? 1 : -1
  })
  /* eslint-enable-next-line fp/no-mutating-methods */
}

export default appendWallet
