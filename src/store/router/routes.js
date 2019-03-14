import createRouter5 from 'router5'
import {
  selectActiveWallet,
  selectActiveWalletId,
  selectWalletsItems,
} from 'store/selectors/wallets'

export const router = createRouter5([], {
  allowNotFound: true,
})

export const routes = [
  {
    name: 'Root',
    path: '/',
    forwardTo: 'Wallet',
  },
  // FIXME: should be /wallet with respect to future login, kyc etc.
  {
    name: 'Wallet',
    path: '/assets',
    children: [
      {
        name: 'ManageAssets',
        path: '/manage',
      },
      {
        name: 'AddAsset',
        path: '/add',
      },
      {
        name: 'EditAsset',
        path: '/edit/:asset-address',
      },
      {
        name: 'ReceiveAsset',
        path: '/receive',
      },
      {
        name: 'SendAsset',
        path: '/send',
      },
      {
        name: 'Favorites',
        path: '~/favorites',
      },
      {
        name: 'FavoritesAddress',
        path: '~/favorites/address',
      },
      {
        name: 'Settings',
        path: '~/settings',
      },
      {
        name: 'SettingsCurrency',
        path: '~/settings/currency',
      },
      {
        name: 'SettingsPassword',
        path: '~/settings/password',
      },
      {
        name: 'Transactions',
        path: '~/transactions',
        children: [
          {
            name: 'Asset',
            path: '/:asset',
          },
        ],
      },
      {
        name: 'Upgrade',
        path: '~/upgrade',
      },
    ],
  },
  {
    name: 'Wallets',
    path: '/wallets',
  },
  // FIXME: there should be no route for address selection
  {
    name: 'WalletsAddresses',
    path: '/wallets/addresses',
  },
  // FIXME: walletId as query parameter?
  {
    name: 'WalletsBackup',
    path: '/wallets/backup/:walletId',
  },
  {
    name: 'WalletsCreate',
    path: '/wallets/create',
  },
  // FIXME: walletId as query parameter?
  {
    name: 'WalletsDelete',
    path: '/wallets/delete/:walletId',
  },
  {
    name: 'WalletsImport',
    path: '/wallets/import',
  },
  // FIXME: walletId as query parameter?
  {
    name: 'WalletsRename',
    path: '/wallets/rename/:walletId',
  },
  // FIXME: address as query parameter?
  {
    name: 'WalletsRenameAddress',
    path: '/wallets/rename/address/:address',
  },
]
router.add(routes)

router.canActivate(
  'Wallet',
  (routerInstance, dependencies) => (toState, fromState, done) => {
    const { store } = dependencies
    const state = store.getState()

    if (selectWalletsItems(state).length === 0) {
      return done({
        redirect: {
          name: 'Wallets',
        },
      })
    }

    if (!selectActiveWalletId(state)) {
      return done({
        redirect: {
          name: 'Wallets',
        },
      })
    }

    return done()
  },
)

router.canActivate(
  'Wallet.SendAsset',
  (routerInstance, dependencies) => (toState, fromState, done) => {
    const { store } = dependencies
    const state = store.getState()

    const activeWallet = selectActiveWallet(state)

    if (activeWallet && activeWallet.isReadOnly) {
      return done({
        redirect: {
          name: 'Wallet.Upgrade',
        },
      })
    }

    return done()
  },
)

router.canActivate(
  'WalletsBackup',
  (routerInstance, dependencies) => (toState, fromState, done) => {
    const { store } = dependencies
    const state = store.getState()

    const activeWallet = selectActiveWallet(state)

    if (activeWallet && activeWallet.isReadOnly) {
      return done({
        redirect: {
          name: 'Wallets',
        },
      })
    }

    return done()
  },
)

router.canActivate(
  'Wallet.Upgrade',
  (routerInstance, dependencies) => (toState, fromState, done) => {
    const { store } = dependencies
    const state = store.getState()

    const activeWallet = selectActiveWallet(state)

    if (activeWallet && !activeWallet.isReadOnly) {
      return done({
        redirect: {
          name: 'Wallet',
        },
      })
    }

    return done()
  },
)
