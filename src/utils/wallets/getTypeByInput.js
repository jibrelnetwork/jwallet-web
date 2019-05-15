// @flow

import {
  checkAddressValid,
  checkPrivateKeyValid,
} from 'utils/address'

import {
  checkXkeyValid,
  checkMnemonicValid,
} from 'utils/mnemonic'

export function getTypeByInput(data: ?string): ?WalletCustomType {
  if (!data) {
    return null
  } else if (checkMnemonicValid(data)) {
    return 'mnemonic'
  } else if (checkXkeyValid(data, 'prv')) {
    return 'xprv'
  } else if (checkXkeyValid(data, 'pub')) {
    return 'xpub'
  } else if (checkPrivateKeyValid(data)) {
    return 'privateKey'
  } else if (checkAddressValid(data) || checkAddressValid(`0x${data}`)) {
    return 'address'
  }

  return null
}
