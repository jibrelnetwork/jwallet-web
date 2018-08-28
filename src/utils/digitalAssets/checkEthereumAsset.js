// @flow

import ethereum from 'data/assets/ethereum'

function checkEthereumAsset(address: Address): boolean {
  return (address.toLowerCase() === ethereum.address.toLowerCase())
}

export default checkEthereumAsset
