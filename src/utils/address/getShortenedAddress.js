// @flow

function getShortenedAddress(
  address: Address,
  startSymbols: number = 15,
  finishSymbols: number = 6,
  splitSymbol: string = '...'
): string {
  return `${address.substr(0, startSymbols)}${splitSymbol}${address.substr(-1 * finishSymbols)}`
}

export default getShortenedAddress
