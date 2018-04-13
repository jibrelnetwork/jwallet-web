// @flow

import * as wallets from './wallets'
import addresses from '../routes/Addresses/sagas'
import createWallet from '../routes/Create/sagas'
import importWallet from '../routes/Import/sagas'
import editWallet from '../routes/Edit/sagas'
import backupWallet from '../routes/Backup/sagas'
import changeWalletPassword from '../routes/ChangePassword/sagas'
import removeWallet from '../routes/Remove/sagas'

export default {
  ...wallets,
  ...addresses,
  ...createWallet,
  ...importWallet,
  ...editWallet,
  ...backupWallet,
  ...changeWalletPassword,
  ...removeWallet,
}
