// @flow

import { walletsRootSaga as walletsSagas } from './core'
import * as walletsAddressesSagas from './addresses'
import * as walletsBackupSagas from './backup'
import * as walletsCreateSagas from './create'
import * as walletsDeleteSagas from './delete'
import * as walletsImportSagas from './import'
import * as walletsRenameSagas from './rename'
import * as walletsRenameAddressSagas from './renameAddress'
import * as walletsStarSagas from './start'

export {
  getPrivateKey,
  getPrivateKeyCancel,
  GetPrivateKeyError,
} from './core'

export default {
  ...{ walletsSagas },
  ...walletsCreateSagas,
  ...walletsImportSagas,
  ...walletsRenameSagas,
  ...walletsDeleteSagas,
  ...walletsBackupSagas,
  ...walletsAddressesSagas,
  ...walletsRenameAddressSagas,
  ...walletsStarSagas,
}
