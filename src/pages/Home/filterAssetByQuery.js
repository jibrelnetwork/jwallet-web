// @flow strict

import { startsWith } from 'lodash-es'

import { startsWithOrEndsWith } from 'utils/address'

export function filterAssetByQuery(item: DigitalAssetWithBalance, query: string) {
  const {
    name,
    symbol,
    blockchainParams: {
      address,
    },
  } = item

  return startsWith(name.toLowerCase(), query.toLowerCase())
    || startsWith(symbol.toLowerCase(), query.toLowerCase())
    || (address && startsWithOrEndsWith(address, query))
}
