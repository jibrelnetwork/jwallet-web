// @flow

// core
import coreSagas from 'routes/sagas'

// wallets
import walletsSagas from 'routes/Wallets/sagas'

// digital assets
import digitalAssetsSagas from 'routes/DigitalAssets/sagas'

// not found
import notFoundSagas from 'routes/NotFound/sagas'

export default {
  // core
  ...coreSagas,
  // wallets
  ...walletsSagas,
  // digital assets
  ...digitalAssetsSagas,
  // not found
  ...notFoundSagas,
}
