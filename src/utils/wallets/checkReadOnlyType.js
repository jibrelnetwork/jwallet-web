// @flow strict

export function checkReadOnlyType(type: WalletCustomType): boolean {
  return ['address', 'xpub'].includes(type)
}
