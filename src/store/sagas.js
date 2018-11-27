// @flow

// core
import coreSagas from 'routes/sagas'

// wallets
import walletsSagas from 'routes/Wallets/sagas'

// digital assets
import digitalAssetsSagas from 'routes/DigitalAssets/sagas'

// terms
import termsSagas from 'routes/Terms/sagas'

// not found
import notFoundSagas from 'routes/NotFound/sagas'

export default {
  // core
  ...coreSagas,
  // wallets
  ...walletsSagas,
  // digital assets
  ...digitalAssetsSagas,
  // terms
  ...termsSagas,
  // not found
  ...notFoundSagas,
}
