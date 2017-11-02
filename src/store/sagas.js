import * as currenciesSagas from 'routes/JWallet/sagas/currencies'
// import * as fundsSagas from 'routes/JWallet/sagas/funds'
import * as keystoreSagas from 'routes/JWallet/sagas/keystore'
import * as modalsSagas from 'routes/JWallet/sagas/modals'
import * as networksSagas from 'routes/JWallet/sagas/networks'
import * as transactionsSagas from 'routes/JWallet/sagas/transactions'

export default {
  ...currenciesSagas,
  // ...fundsSagas,
  ...keystoreSagas,
  ...modalsSagas,
  ...networksSagas,
  ...transactionsSagas,
}
