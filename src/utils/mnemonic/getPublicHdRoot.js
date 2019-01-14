// @flow

import bitcore from 'bitcore-lib'

function getPublicHdRoot(bip32XPublicKey: string): HDPublicKey {
  return new bitcore.HDPublicKey(bip32XPublicKey)
}

export default getPublicHdRoot
