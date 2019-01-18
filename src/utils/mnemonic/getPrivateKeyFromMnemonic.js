// @flow

import getPrivateHdRoot from './getPrivateHdRoot'

function getPrivateKeyFromMnemonic(
  mnemonic: string,
  addressIndex: number,
  mnemonicOptions: MnemonicOptions,
): string {
  const hdRoot: HDPrivateKey = getPrivateHdRoot(mnemonic, mnemonicOptions)
  const generatedKey: HDPrivateKey = hdRoot.derive(addressIndex)

  return generatedKey.privateKey.toString()
}

export default getPrivateKeyFromMnemonic
