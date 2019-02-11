// @flow

import getAddressFromPublicKey from 'utils/address/getAddressFromPublicKey'

function generateAddress(hdRoot: HDPublicKey, index: number): string {
  const generatedKey: HDPublicKey = hdRoot.derive(index)
  const publicKey: string = generatedKey.publicKey.toString()

  return getAddressFromPublicKey(publicKey)
}

export default generateAddress
