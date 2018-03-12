/**
 * Deprecated
 */
import * as alphaWarningModalSagas from 'routes/JWallet/sagas/alphaWarningModal'
import * as backupKeystoreModalSagas from 'routes/JWallet/sagas/backupKeystoreModal'
import * as fundsModalsSagas from 'routes/JWallet/sagas/fundsModals'
import * as i18nSagas from 'routes/JWallet/sagas/i18n'
import * as keystoreSagas from 'routes/JWallet/sagas/keystore'
import * as keystoreModalsSagas from 'routes/JWallet/sagas/keystoreModals'
import * as networksSagas from 'routes/JWallet/sagas/networks'

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
  // deprecated
  ...alphaWarningModalSagas,
  ...backupKeystoreModalSagas,
  ...fundsModalsSagas,
  ...i18nSagas,
  ...keystoreSagas,
  ...keystoreModalsSagas,
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
