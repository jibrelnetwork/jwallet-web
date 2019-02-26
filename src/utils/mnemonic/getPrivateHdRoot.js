// @flow

import bitcore from 'bitcore-lib'

import getHdPath from './getHdPath'

function getPrivateHdRoot(
  mnemonic: string,
  passphrase: string,
  derivationPath: string,
  network: ?NetworkId,
): HDPrivateKey {
  const hdPath: string = getHdPath(mnemonic, passphrase, derivationPath, network)

  return new bitcore.HDPrivateKey(hdPath)
}

export default getPrivateHdRoot
