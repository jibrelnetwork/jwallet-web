// @flow

import ethereum from 'data/assets/ethereum'

export default function isETH(address: Address): boolean {
  return (address === ethereum.address)
}
