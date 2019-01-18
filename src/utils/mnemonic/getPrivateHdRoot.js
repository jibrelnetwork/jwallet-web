// @flow

import bitcore from 'bitcore-lib'

import getHdPath from './getHdPath'

function getPrivateHdRoot(mnemonic: string, mnemonicOptions: MnemonicOptions): HDPrivateKey {
  const hdPath: string = getHdPath(mnemonic, mnemonicOptions)

  return new bitcore.HDPrivateKey(hdPath)
}

export default getPrivateHdRoot
