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
   +networks: NetworksState,
  // digitalAssets
  +digitalAssets: DigitalAssetsState,
  +addAsset: AddAssetState,
  +editAsset: EditAssetState,
  +digitalAssetsGrid: DigitalAssetsGridState,
  +digitalAssetsManage: DigitalAssetsManageState,
  // blocks
  +blocks: BlocksState,
  // transactions
  +transactions: TransactionsState,
  // balances
  +balances: BalancesState,
  +settings: SettingsState,
  // funds
  // +receiveFunds: ReceiveFundsData,
  // +sendFunds: SendFundsData,
  // router
  +router: RouterState,
}
