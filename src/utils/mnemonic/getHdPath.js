// @flow strict

import bitcore from 'bitcore-lib'
import Mnemonic from 'bitcore-mnemonic'

const DEFAULT_DERIVATION_PATH: string = 'm/44\'/60\'/0\'/0'

export function getHdPath(
  mnemonic: string,
  passphrase: ?string,
  derivationPath: ?string,
): string {
  const hdRoot: string = new Mnemonic(mnemonic.trim()).toHDPrivateKey(passphrase || '').xprivkey
  const hdRootKey: HDPrivateKey = new bitcore.HDPrivateKey(hdRoot)

  return hdRootKey.derive(derivationPath || DEFAULT_DERIVATION_PATH).xprivkey
}
