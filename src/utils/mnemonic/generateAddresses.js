// @flow strict

import {
  getPublicHdRoot,
  generateAddress,
} from '.'

export function generateAddresses(
  xpub: string,
  start: ?number,
  end: ?number,
): string[] {
  const hdRoot: HDPublicKey = getPublicHdRoot(xpub)
  const startIndex: number = start || 0
  const endIndex: number = end || startIndex
  const addressesCount: number = endIndex - startIndex

  // generate range from 0 to addressesCount
  return Array
    .from(new Array(addressesCount + 1).keys())
    .map((currentIndex: number): string => generateAddress(hdRoot, startIndex + currentIndex))
}
