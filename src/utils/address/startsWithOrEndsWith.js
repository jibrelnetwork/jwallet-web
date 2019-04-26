// @flow strict

import { endsWith } from 'lodash-es'

export function startsWithOrEndsWith(initialAddress: string, initialQuery: string): boolean {
  const address = initialAddress.toLowerCase()
  const query = initialQuery.toLowerCase()

  return address.startsWith(query)
    || address.startsWith(`0x${query}`)
    || endsWith(address, query)
}
