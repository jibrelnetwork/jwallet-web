// @flow

import { walletsRootSaga } from './core'
import { walletsStartRootSaga } from './start'
import { walletsBackupRootSaga } from './backup'
import { walletsCreateRootSaga } from './create'
import { walletsDeleteRootSaga } from './delete'
import { walletsImportRootSaga } from './import'
import { walletsRenameRootSaga } from './rename'
import { walletsAddressesRootSaga } from './addresses'
import { walletsRenameAddressRootSaga } from './renameAddress'

export {
  getPrivateKey,
  getPrivateKeyCancel,
  GetPrivateKeyError,
} from './core'

export default {
  walletsRootSaga,
  walletsStartRootSaga,
  walletsBackupRootSaga,
  walletsCreateRootSaga,
  walletsDeleteRootSaga,
  walletsImportRootSaga,
  walletsRenameRootSaga,
  walletsAddressesRootSaga,
  walletsRenameAddressRootSaga,
}
