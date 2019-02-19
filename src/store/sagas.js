// @flow

import coreSagas from 'store/sagas/index'
import { upgradeRootSaga as upgradeSagas } from 'store/sagas/upgrade'
import walletsSagas from 'store/sagas/wallets'
import * as notFoundSagas from 'store/sagas/notFound'
import { favoritesRootSaga as favoritesSagas } from 'store/sagas/favorites'
import * as digitalAssetsSagas from 'store/sagas/digitalAssets/core'
import { settingsRootSaga as settingsSagas } from 'store/sagas/settings'

export default {
  ...coreSagas,
  ...upgradeSagas,
  ...walletsSagas,
  ...notFoundSagas,
  ...favoritesSagas,
  ...digitalAssetsSagas,
  ...settingsSagas,
}
