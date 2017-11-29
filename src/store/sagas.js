import * as currenciesSagas from 'routes/JWallet/sagas/currencies'
import * as fundsModalsSagas from 'routes/JWallet/sagas/fundsModals'
import * as keystoreSagas from 'routes/JWallet/sagas/keystore'
import * as keystoreModalsSagas from 'routes/JWallet/sagas/keystoreModals'
import * as networksSagas from 'routes/JWallet/sagas/networks'
import * as notificationSagas from 'routes/JWallet/sagas/notification'
import * as transactionsSagas from 'routes/JWallet/sagas/transactions'

export default {
  ...currenciesSagas,
  ...fundsModalsSagas,
  ...keystoreSagas,
  ...keystoreModalsSagas,
  ...networksSagas,
  ...notificationSagas,
  ...transactionsSagas,
}
