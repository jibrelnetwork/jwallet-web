import * as currenciesSagas from 'routes/JWallet/sagas/currencies'
// import * as fundsSagas from 'routes/JWallet/sagas/funds'
import * as fundsModalsSagas from 'routes/JWallet/sagas/fundsModals'
import * as keystoreSagas from 'routes/JWallet/sagas/keystore'
import * as keystoreModalsSagas from 'routes/JWallet/sagas/keystoreModals'
import * as networksSagas from 'routes/JWallet/sagas/networks'
import * as transactionsSagas from 'routes/JWallet/sagas/transactions'

export default {
  ...currenciesSagas,
  // ...fundsSagas,
  ...fundsModalsSagas,
  ...keystoreSagas,
  ...keystoreModalsSagas,
  ...networksSagas,
  ...transactionsSagas,
}
