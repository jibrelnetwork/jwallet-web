/**
 * Deprecated
 */
import * as alphaWarningModalSagas from 'routes/JWallet/sagas/alphaWarningModal'
import * as backupKeystoreModalSagas from 'routes/JWallet/sagas/backupKeystoreModal'
import * as currenciesSagas from 'routes/JWallet/sagas/currencies'
import * as fundsModalsSagas from 'routes/JWallet/sagas/fundsModals'
import * as i18nSagas from 'routes/JWallet/sagas/i18n'
import * as keystoreSagas from 'routes/JWallet/sagas/keystore'
import * as keystoreModalsSagas from 'routes/JWallet/sagas/keystoreModals'
import * as networksSagas from 'routes/JWallet/sagas/networks'
import * as transactionsSagas from 'routes/JWallet/sagas/transactions'

/**
 * Assets
 */
import * as sendFundsSagas from 'routes/SendFunds/sagas/sendFunds'
import * as addCustomAssetSagas from 'routes/AddCustomAsset/sagas/addCustomAsset'
import * as receiveFundsSagas from 'routes/ReceiveFunds/sagas/receiveFunds'

/**
 * Wallets
 */
import walletsSagas from 'routes/Wallets/sagas'

export default {
  // deprecated
  ...alphaWarningModalSagas,
  ...backupKeystoreModalSagas,
  ...currenciesSagas,
  ...fundsModalsSagas,
  ...i18nSagas,
  ...keystoreSagas,
  ...keystoreModalsSagas,
  ...networksSagas,
  ...transactionsSagas,
  // assets
  ...sendFundsSagas,
  ...receiveFundsSagas,
  ...addCustomAssetSagas,
  // keys
  ...walletsSagas,
}
