// @flow

// Wallets
import walletsSagas from 'routes/Wallets/sagas'

// Custom Asset
import customAssetSagas from 'routes/CustomAsset/sagas/customAsset'

/*
// Networks
import * as networksSagas from 'routes/sagas/networks'

// Funds
import fundsSagas from 'routes/Funds/sagas'

// Digital Assets
import digitalAssetsSagas from 'routes/DigitalAssets/sagas'

// Transactions
import transactionsSagas from 'routes/Transactions/sagas'
*/

export default {
  /*
  // Networks
  ...networksSagas,
  // Funds
  ...fundsSagas,
  // Digital Assets
  ...digitalAssetsSagas,
  // Transactions
  ...transactionsSagas,
  */
  // Wallets
  ...walletsSagas,
  // Custom Asset
  ...customAssetSagas,
}
