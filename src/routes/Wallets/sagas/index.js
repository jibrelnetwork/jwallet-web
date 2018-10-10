// @flow

import { walletsRootSaga } from './wallets'
import walletsCreateSagas from '../routes/Create/sagas'
import walletsImportSagas from '../routes/Import/sagas'
import walletsRenameSagas from '../routes/Rename/sagas'

const walletSagas = { walletsRootSaga }

/*
import addresses from '../routes/Addresses/sagas'
import editWallet from '../routes/Edit/sagas'
import backupWallet from '../routes/Backup/sagas'
import changeWalletPassword from '../routes/ChangePassword/sagas'
import removeWallet from '../routes/Remove/sagas'
*/

export default {
  ...walletSagas,
  ...walletsCreateSagas,
  ...walletsImportSagas,
  ...walletsRenameSagas,
  /*
  ...addresses,
  ...importWallet,
  ...editWallet,
  ...backupWallet,
  ...changeWalletPassword,
  ...removeWallet,
  */
}
