// @flow

import { walletsRootSaga } from './wallets'
import walletsCreateSagas from '../routes/Create/sagas'
import walletsImportSagas from '../routes/Import/sagas'
import walletsRenameSagas from '../routes/Rename/sagas'
import walletsBackupSagas from '../routes/Backup/sagas'
import walletsDeleteSagas from '../routes/Delete/sagas'
import walletsAddressesSagas from '../routes/Addresses/sagas'

const walletSagas = { walletsRootSaga }

export default {
  ...walletSagas,
  ...walletsCreateSagas,
  ...walletsImportSagas,
  ...walletsRenameSagas,
  ...walletsBackupSagas,
  ...walletsDeleteSagas,
  ...walletsAddressesSagas,
}
