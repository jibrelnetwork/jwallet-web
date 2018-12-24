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
  // send asset
  +digitalAssetsSend: DigitalAssetSendState,
  // blocks
  +blocks: BlocksState,
  // transactions
  +transactions: TransactionsState,
  // balances
  +balances: BalancesState,
  // settings
  +settings: SettingsState,
  // favorites
  +favorites: FavoritesState,
  // router
  +router: RouterState,
}
