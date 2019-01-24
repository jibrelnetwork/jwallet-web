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
  +digitalAssetsAdd: AddAssetState,
  +digitalAssetsEdit: EditAssetState,
  +digitalAssetsGrid: DigitalAssetsGridState,
  +digitalAssetsManage: DigitalAssetsManageState,
  +digitalAssetsSend: DigitalAssetsSendState,
  // blocks
  +blocks: BlocksState,
  // transactions
  +transactions: TransactionsState,
  // balances
  +balances: BalancesState,
  // comments
  +comments: CommentsState,
  // settings
  +settings: SettingsState,
  // favorites
  +favorites: FavoritesState,
  // upgrade
  +upgrade: UpgradeState,
  // ticker
  +ticker: TickerState,
  // router
  +router: RouterState,
}
