import * as accountsSagas from 'routes/JWallet/sagas/accounts'
import * as fundsSagas from 'routes/JWallet/sagas/funds'
import * as keysSagas from 'routes/JWallet/sagas/keys'
import * as networksSagas from 'routes/JWallet/sagas/networks'
import * as transactionsSagas from 'routes/JWallet/sagas/transactions'

export default {
  ...accountsSagas,
  ...fundsSagas,
  ...keysSagas,
  ...networksSagas,
  ...transactionsSagas,
}
