// @flow

import coreSagas from 'routes/sagas'
import upgradeSagas from 'routes/Upgrade/sagas'
import walletsSagas from 'routes/Wallets/sagas'
import notFoundSagas from 'routes/NotFound/sagas'
import favoritesSagas from 'routes/Favorites/sagas'
import digitalAssetsSagas from 'routes/DigitalAssets/sagas'

export default {
  ...coreSagas,
  ...upgradeSagas,
  ...walletsSagas,
  ...notFoundSagas,
  ...favoritesSagas,
  ...digitalAssetsSagas,
}
