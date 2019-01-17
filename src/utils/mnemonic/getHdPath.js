// @flow

import bitcore from 'bitcore-lib'
import Mnemonic from 'bitcore-mnemonic'

function getHdPath(mnemonic: string, mnemonicOptions: MnemonicOptions): string {
  const {
    network,
    passphrase,
    derivationPath,
  }: MnemonicOptions = mnemonicOptions

  const hdRoot: string = new Mnemonic(mnemonic.trim()).toHDPrivateKey(passphrase, network).xprivkey
  const hdRootKey: HDPrivateKey = new bitcore.HDPrivateKey(hdRoot)

  return hdRootKey.derive(derivationPath).xprivkey
}

export default getHdPath
