// Networks
import * as networksSagas from 'routes/sagas/networks'

// Funds
import fundsSagas from 'routes/Funds/sagas'

// Digital Assets
import digitalAssetsSagas from 'routes/DigitalAssets/sagas'

// Custom Asset
import customAssetSagas from 'routes/CustomAsset/sagas'

// Transactions
import transactionsSagas from 'routes/Transactions/sagas'

// Wallets
import walletsSagas from 'routes/Wallets/sagas'

export default {
  // Networks
  ...networksSagas,
  // Funds
  ...fundsSagas,
  // Digital Assets
  ...digitalAssetsSagas,
  // Custom Asset
  ...customAssetSagas,
  // Transactions
  ...transactionsSagas,
  // Wallets
  ...walletsSagas,
}
