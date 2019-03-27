// @flow

import { ethereum } from 'data/assets'

function checkETH(address: AssetAddress): boolean {
  return (address.toLowerCase() === ethereum.blockchainParams.address.toLowerCase())
}

export default checkETH
