// @flow strict

import { getAddressFromPublicKey } from 'utils/address'

export function generateAddress(hdRoot: HDPublicKey, index: number): string {
  const generatedKey: HDPublicKey = hdRoot.derive(index)
  const publicKey: string = generatedKey.publicKey.toString()

  return getAddressFromPublicKey(publicKey)
}
