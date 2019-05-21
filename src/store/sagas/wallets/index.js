// @flow

import { walletsRootSaga } from './core'
import { walletsBackupRootSaga } from './backup'
import { walletsCreateRootSaga } from './create'
import { walletsDeleteRootSaga } from './delete'
import { walletsRenameRootSaga } from './rename'
import { walletsAddressesRootSaga } from './addresses'
import { walletsRenameAddressRootSaga } from './renameAddress'

export {
  getPrivateKey,
  getPrivateKeyCancel,
  GetPrivateKeyError,
} from './core'

export default [
  walletsRootSaga,
  walletsBackupRootSaga,
  walletsCreateRootSaga,
  walletsDeleteRootSaga,
  walletsRenameRootSaga,
  walletsAddressesRootSaga,
  walletsRenameAddressRootSaga,
]
