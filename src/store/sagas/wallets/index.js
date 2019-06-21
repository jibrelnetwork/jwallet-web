// @flow strict

import { walletsRootSaga } from './core'
import { walletsCreateRootSaga } from './create'
import { walletsRenameRootSaga } from './rename'
import { walletsAddressesRootSaga } from './addresses'
import { walletsRenameAddressRootSaga } from './renameAddress'

export default [
  walletsRootSaga,
  walletsCreateRootSaga,
  walletsRenameRootSaga,
  walletsAddressesRootSaga,
  walletsRenameAddressRootSaga,
]
