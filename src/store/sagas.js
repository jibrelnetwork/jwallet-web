import * as alphaWarningModalSagas from 'routes/JWallet/sagas/alphaWarningModal'
import * as backupKeystoreModalSagas from 'routes/JWallet/sagas/backupKeystoreModal'
import * as currenciesSagas from 'routes/JWallet/sagas/currencies'
import * as fundsModalsSagas from 'routes/JWallet/sagas/fundsModals'
import * as i18nSagas from 'routes/JWallet/sagas/i18n'
import * as keystoreSagas from 'routes/JWallet/sagas/keystore'
import * as keystoreModalsSagas from 'routes/JWallet/sagas/keystoreModals'
import * as networksSagas from 'routes/JWallet/sagas/networks'
import * as transactionsSagas from 'routes/JWallet/sagas/transactions'
import * as addCustomAssetSagas from 'routes/AddCustomAsset/sagas/addCustomAsset'
import * as backupKeysSagas from 'routes/BackupKeys/sagas/backupKeys'
import * as changePasswordSagas from 'routes/ChangePassword/sagas/changePassword'
import * as clearKeysSagas from 'routes/ClearKeys/sagas/clearKeys'
import * as createKeySagas from 'routes/CreateKey/sagas/createKey'
import * as importKeySagas from 'routes/ImportKey/sagas/importKey'
import * as receiveFundsSagas from 'routes/ReceiveFunds/sagas/receiveFunds'
import * as sendFundsSagas from 'routes/SendFunds/sagas/sendFunds'

export default {
  ...alphaWarningModalSagas,
  ...backupKeystoreModalSagas,
  ...currenciesSagas,
  ...fundsModalsSagas,
  ...i18nSagas,
  ...keystoreSagas,
  ...keystoreModalsSagas,
  ...networksSagas,
  ...transactionsSagas,
  ...addCustomAssetSagas,
  ...backupKeysSagas,
  ...changePasswordSagas,
  ...clearKeysSagas,
  ...createKeySagas,
  ...importKeySagas,
  ...receiveFundsSagas,
  ...sendFundsSagas,
}
