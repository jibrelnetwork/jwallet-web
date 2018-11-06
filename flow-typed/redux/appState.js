// @flow

/* eslint-disable no-unused-vars */

import type { Saga } from 'redux-saga'
import type { Persistor } from 'redux-persist/lib/types'

/* eslint-enable no-unused-vars */

declare type AppState = {|
  // wallets
  +wallets: WalletsState,
  +walletsCreate: WalletsCreateState,
  +walletsImport: WalletsImportState,
  +walletsBackup: WalletsBackupState,
  +walletsAddresses: WalletsAddressesState,
  +walletsRenameAddress: WalletsRenameAddressState,
  // networks
  // +networks: NetworksData,
  // digitalAssets
  +digitalAssets: DigitalAssetsState,
  +digitalAssetsGrid: DigitalAssetsGridState,
  // +customAsset: CustomAssetState,
  // transactions
  // +transactions: TransactionsData,
  // funds
  // +receiveFunds: ReceiveFundsData,
  // +sendFunds: SendFundsData,
  // router
  +router: RouterData,
|}
