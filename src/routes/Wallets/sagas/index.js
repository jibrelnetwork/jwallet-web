// @flow

import { walletsRootSaga } from './wallets'
import walletsCreateSagas from '../routes/Create/sagas'
import walletsImportSagas from '../routes/Import/sagas'
import walletsRenameSagas from '../routes/Rename/sagas'
import walletsBackupSagas from '../routes/Backup/sagas'
import walletsDeleteSagas from '../routes/Delete/sagas'

const walletSagas = { walletsRootSaga }

/*
import addresses from '../routes/Addresses/sagas'
*/

export default {
  ...walletSagas,
  ...walletsCreateSagas,
  ...walletsImportSagas,
  ...walletsRenameSagas,
  ...walletsBackupSagas,
  ...walletsDeleteSagas,
  /*
  ...addresses,
  */
}
