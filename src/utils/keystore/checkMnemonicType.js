// @flow

function checkMnemonicType(walletType: ?WalletType): boolean {
  return (walletType === 'mnemonic')
}

export default checkMnemonicType
