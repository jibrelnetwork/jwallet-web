// @flow

import coreSagas from 'routes/sagas'
import walletsSagas from 'routes/Wallets/sagas'
import notFoundSagas from 'routes/NotFound/sagas'
import favoritesSagas from 'routes/Favorites/sagas'
import digitalAssetsSagas from 'routes/DigitalAssets/sagas'

export default {
  ...coreSagas,
  ...walletsSagas,
  ...notFoundSagas,
  ...favoritesSagas,
  ...digitalAssetsSagas,
}
