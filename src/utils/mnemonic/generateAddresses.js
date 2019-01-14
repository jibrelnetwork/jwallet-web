// @flow

import {
  getPublicHdRoot,
  generateAddress,
} from '.'

function generateAddresses(
  bip32XPublicKey: string,
  start: ?number,
  end: ?number,
): Array<string> {
  const hdRoot: HDPublicKey = getPublicHdRoot(bip32XPublicKey)
  const startIndex: number = start || 0
  const endIndex: number = end || startIndex
  const addressesCount: number = endIndex - startIndex

  // generate range from 0 to addressesCount
  return Array
    .from(new Array(addressesCount + 1).keys())
    .map((currentIndex: number): string => generateAddress(hdRoot, startIndex + currentIndex))
}

export default generateAddresses
