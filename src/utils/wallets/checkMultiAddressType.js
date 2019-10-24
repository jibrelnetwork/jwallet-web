// @flow strict

export function checkMultiAddressType(walletType: ?string): boolean {
  return ['mnemonic', 'xpub', 'xprv'].includes(walletType)
}
