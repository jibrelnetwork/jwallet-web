// @flow strict

import { startsWithOrEndsWith } from 'utils/address'

export function filterAssetByQuery(item: DigitalAssetWithBalance, query: string) {
  const {
    name,
    symbol,
    blockchainParams: {
      address,
    },
  } = item

  return name.toLowerCase().startsWith(query.toLowerCase())
    || symbol.toLowerCase().startsWith(query.toLowerCase())
    || (address && startsWithOrEndsWith(address, query))
}
