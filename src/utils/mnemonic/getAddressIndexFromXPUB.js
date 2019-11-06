// @flow strict

import { generateAddresses } from '.'

const FIRST_ADDRESSES_COUNT: number = 20

export function getAddressIndexFromXPUB(
  address: Address,
  xpub: string,
): number {
  return generateAddresses(
    xpub,
    0,
    FIRST_ADDRESSES_COUNT - 1,
  ).indexOf(address)
}
