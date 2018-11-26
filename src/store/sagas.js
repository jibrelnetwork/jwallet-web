// @flow

// Wallets
import walletsSagas from 'routes/Wallets/sagas'

// Digital Assets
import digitalAssetsSagas from 'routes/DigitalAssets/sagas'

// Terms
import termsSagas from 'routes/Terms/sagas'

// Not Found
import notFoundSagas from 'routes/NotFound/sagas'

export default {
  // Wallets
  ...walletsSagas,
  // Digital Assets
  ...digitalAssetsSagas,
  // Terms
  ...termsSagas,
  // Not FOund
  ...notFoundSagas,
}
