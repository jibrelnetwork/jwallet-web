// @flow

function getShortenedAddress(
  address: Address,
  startSymbols: number = 15,
  finishSymbols: number = 6,
): string {
  return `${address.substr(0, startSymbols)}...${address.substr(-1 * finishSymbols)}`
}

export default getShortenedAddress
