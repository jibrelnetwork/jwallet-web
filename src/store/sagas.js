/**
 * General
 */
import * as i18nSagas from 'routes/sagas/i18n'
import * as networksSagas from 'routes/sagas/networks'

/**
 * Funds
 */
import fundsSagas from 'routes/Funds/sagas'

/**
 * Digital Assets
 */
import digitalAssetsSagas from 'routes/DigitalAssets/sagas'
import * as addCustomAssetSagas from 'routes/AddCustomAsset/sagas/addCustomAsset'

/**
 * Transactions
 */
import transactionsSagas from 'routes/Transactions/sagas'

/**
 * Wallets
 */
import walletsSagas from 'routes/Wallets/sagas'

export default {
  // general
  ...i18nSagas,
  ...networksSagas,
  // Funds
  ...fundsSagas,
  // Digital Assets
  ...digitalAssetsSagas,
  ...addCustomAssetSagas,
  // Transactions
  ...transactionsSagas,
  // Wallets
  ...walletsSagas,
}
