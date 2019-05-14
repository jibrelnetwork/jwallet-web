// @flow strict

import {
  endsWith,
  startsWith,
} from 'lodash-es'

import { add0x } from 'utils/address'

export function startsWithOrEndsWith(initialAddress: string, initialQuery: string): boolean {
  const address = initialAddress.toLowerCase()
  const query = initialQuery.toLowerCase()

  return startsWith(address, query)
    || startsWith(address, add0x(query))
    || endsWith(address, query)
}
