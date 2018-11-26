// @flow

/* eslint-disable-next-line no-unused-vars */
import type { Saga, Channel } from 'redux-saga'

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
  +digitalAssetsManage: DigitalAssetsManageState,
  // transactions
  +transactions: TransactionsState,
  // funds
  // +receiveFunds: ReceiveFundsData,
  // +sendFunds: SendFundsData,
  // Balances
  +balances: BalancesState,
  // Blocks
  +blocks: BlocksState,
  // Router
  +router: RouterState,
}
