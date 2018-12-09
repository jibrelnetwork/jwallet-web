// @flow

import ethereum from 'data/assets/ethereum'

function checkETH(address: AssetAddress): boolean {
  return (address.toLowerCase() === ethereum.address.toLowerCase())
}

export default checkETH
