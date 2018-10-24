// @flow

// Wallets
import walletsSagas from 'routes/Wallets/sagas'

// Custom Asset
import customAssetSagas from 'routes/CustomAsset/sagas/customAsset'

// Digital Assets
import digitalAssetsSagas from 'routes/DigitalAssets/sagas'

/*
// Networks
import * as networksSagas from 'routes/sagas/networks'

// Funds
import fundsSagas from 'routes/Funds/sagas'

// Transactions
import transactionsSagas from 'routes/Transactions/sagas'
*/

export default {
  /*
  // Networks
  ...networksSagas,
  // Funds
  ...fundsSagas,
  // Transactions
  ...transactionsSagas,
  */
  // Wallets
  ...walletsSagas,
  // Digital Assets
  ...digitalAssetsSagas,
  // Custom Asset
  ...customAssetSagas,
}
