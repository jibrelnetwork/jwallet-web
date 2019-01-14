// @flow

import {
  getPrivateHdRoot,
  getMnemonicOptions,
} from '.'

function getXPubFromMnemonic(
  mnemonic: string,
  mnemonicOptionsUser: MnemonicOptionsUser,
): string {
  const mnemonicOptions: MnemonicOptions = getMnemonicOptions(mnemonicOptionsUser)
  const hdRoot: HDPrivateKey = getPrivateHdRoot(mnemonic, mnemonicOptions)

  return hdRoot.hdPublicKey.toString()
}

export default getXPubFromMnemonic
