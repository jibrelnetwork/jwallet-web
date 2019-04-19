// @flow strict

import createRouter5 from 'router5'

import {
  selectActiveWallet,
  selectActiveWalletId,
  selectWalletsItems,
} from 'store/selectors/wallets'

export const router = createRouter5([], {
  allowNotFound: true,
})

export const routes: Array<{|
  +name: string,
  +path: string,
|}> = [{
  path: '/',
  name: 'Home',
}, {
  path: '/about',
  name: 'About',
}, {
  path: '/assets/add',
  name: 'AssetsItemAdd',
}, {
  path: '/assets',
  name: 'AssetsManage',
}, {
  path: '/assets/:assetId',
  name: 'AssetsItem',
}, {
  path: '/assets/:assetId/edit',
  name: 'AssetsItemEdit',
}, {
  path: '/contacts',
  name: 'Contacts',
}, {
  path: '/contacts/add',
  name: 'ContactsItemAdd',
}, {
  path: '/contacts/:contactId',
  name: 'ContactsItemEdit',
}, {
  path: '/history',
  name: 'History',
}, {
  path: '/history/:itemId',
  name: 'HistoryItem',
}, {
  path: '/more',
  name: 'MoreActions',
}, {
  path: '/receive',
  name: 'Receive',
}, {
  path: '/send',
  name: 'Send',
}, {
  path: '/settings',
  name: 'Settings',
}, {
  path: '/settings/currency',
  name: 'SettingsCurrency',
}, {
  path: '/settings/development',
  name: 'SettingsDevelopment',
}, {
  path: '/settings/language',
  name: 'SettingsLanguage',
}, {
  path: '/settings/security-password',
  name: 'SettingsSecurityPassword',
}, {
  path: '/support',
  name: 'Support',
}, {
  path: '/wallets',
  name: 'Wallets',
}, {
  path: '/wallets/create',
  name: 'WalletsCreate',
}, {
  path: '/wallets/import',
  name: 'WalletsImport',
}, {
  path: '/wallets/:walletId',
  name: 'WalletsItem',
}, {
  path: '/wallets/:walletId/backup',
  name: 'WalletsItemBackup',
}, {
  path: '/wallets/:walletId/delete',
  name: 'WalletsItemDelete',
}, {
  path: '/wallets/:walletId/rename',
  name: 'WalletsItemRename',
}, {
  path: '/wallets/:walletId/upgrade',
  name: 'WalletsItemUpgrade',
}]

router.add(routes)

// FIXME: this should be removed as soon as we get rid of
// select current wallet that could select nothing
router.canActivate(
  'Home',
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
  'Send',
  (routerInstance, dependencies) => (toState, fromState, done) => {
    const { store } = dependencies
    const state = store.getState()

    const activeWallet = selectActiveWallet(state)

    if (activeWallet && activeWallet.isReadOnly) {
      return done({
        redirect: {
          name: 'WalletsItemUpgrade',
        },
      })
    }

    return done()
  },
)

router.canActivate(
  'WalletsItemBackup',
  (routerInstance, dependencies) => (toState, fromState, done) => {
    const { store } = dependencies
    const state = store.getState()

    const activeWallet = selectActiveWallet(state)

    if (activeWallet && activeWallet.isReadOnly) {
      return done({
        redirect: {
          name: 'WalletsItemUpgrade',
        },
      })
    }

    return done()
  },
)
