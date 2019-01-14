// @flow

import {
  checkAddressValid,
  checkMnemonicValid,
  checkPrivateKeyValid,
  checkBip32XPublicKeyValid,
} from '.'

function getTypeByInput(data: ?string): ?WalletCustomType {
  if (!data) {
    return null
  } else if (checkMnemonicValid(data)) {
    return 'mnemonic'
  } else if (checkBip32XPublicKeyValid(data)) {
    return 'bip32Xpub'
  } else if (checkPrivateKeyValid(data)) {
    return 'privateKey'
  } else if (checkAddressValid(data)) {
    return 'address'
  }

  return null
}

export default getTypeByInput
