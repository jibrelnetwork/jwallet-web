// @flow

import {
  // eslint-disable-next-line no-unused-vars
  type Saga,
  // eslint-disable-next-line no-unused-vars
  type Channel,
} from 'redux-saga'

declare type Router5Route = {
  +name: string,
  +params: {
    [key: string]: any,
  },
  +path: string,
  // TODO: describe meta property
}

type Router5State = {
  +route: Router5Route,
  previousRoute?: Router5Route,
}

declare type AppState = {
  // wallets
  +wallets: WalletsState,
  +walletsCreate: WalletsCreateState,
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
  +router: Router5State,
  // password
  +password: PasswordState,
  // user
  +user: UserState,
}
