// @flow strict

export function getShortenedAddress(
  address: Address,
  startSymbols: number = 10,
  finishSymbols: number = 10,
  splitSymbol: string = '...',
): string {
  return `${address.substr(0, startSymbols)}${splitSymbol}${address.substr(-1 * finishSymbols)}`
}
