// @flow

/* eslint-disable-next-line no-unused-vars */
import type { Saga } from 'redux-saga'

declare type AppState = {
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
  +addAsset: AddAssetState,
  +editAsset: EditAssetState,
  +digitalAssetsGrid: DigitalAssetsGridState,
  // transactions
  +transactions: TransactionsState,
  // funds
  // +receiveFunds: ReceiveFundsData,
  // +sendFunds: SendFundsData,
  // blocks
  +blocks: BlocksState,
  // router
  +router: RouterState,
}
