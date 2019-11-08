// @flow strict

export default function getShortenedAddress(
  address: Address,
  startSymbols: number = 10,
  finishSymbols: number = 10,
  splitSymbol: string = '\u2026',
): string {
  return `${address.substr(0, startSymbols)}${splitSymbol}${address.substr(-1 * finishSymbols)}`
}
