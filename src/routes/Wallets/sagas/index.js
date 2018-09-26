// @flow

import createWallet from '../routes/Create/sagas'

/*
import addresses from '../routes/Addresses/sagas'
import importWallet from '../routes/Import/sagas'
import editWallet from '../routes/Edit/sagas'
import backupWallet from '../routes/Backup/sagas'
import changeWalletPassword from '../routes/ChangePassword/sagas'
import removeWallet from '../routes/Remove/sagas'
*/

export default {
  ...createWallet,
  /*
  ...addresses,
  ...importWallet,
  ...editWallet,
  ...backupWallet,
  ...changeWalletPassword,
  ...removeWallet,
  */
}
