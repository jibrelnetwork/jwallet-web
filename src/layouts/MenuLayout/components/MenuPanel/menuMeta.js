// @flow strict

export type MenuMeta = {
  isMinimized: boolean,
  previousRoute: ?string,
}

const MENU_META_DEFAULT: MenuMeta = {
  isMinimized: false,
  previousRoute: null,
}

const MENU_META: { [string]: ?MenuMeta } = {
  Home: {
    isMinimized: false,
    previousRoute: null,
  },
  Send: {
    isMinimized: true,
    previousRoute: '/',
  },
  ReceiveAsset: {
    isMinimized: true,
    previousRoute: '/',
  },
  AssetsItem: {
    isMinimized: true,
    previousRoute: '/',
  },
  AssetsItemDetails: {
    isMinimized: true,
    previousRoute: '/',
  },
  AssetsItemAdd: {
    isMinimized: true,
    previousRoute: '/',
  },
  AssetsItemEdit: {
    isMinimized: true,
    previousRoute: '/',
  },
  AssetsItemDelete: {
    isMinimized: true,
    previousRoute: '/',
  },
  History: {
    isMinimized: false,
    previousRoute: null,
  },
  HistoryItem: {
    isMinimized: true,
    previousRoute: '/history',
  },
  HistoryItemCancel: {
    isMinimized: true,
    previousRoute: '/history',
  },
  Contacts: {
    isMinimized: false,
    previousRoute: '/',
  },
  ContactsItem: {
    isMinimized: true,
    previousRoute: '/contacts',
  },
  ContactsItemAdd: {
    isMinimized: true,
    previousRoute: '/contacts',
  },
  ContactsItemEdit: {
    isMinimized: true,
    previousRoute: '/contacts',
  },
  ContactsItemDelete: {
    isMinimized: true,
    previousRoute: null,
  },
  More: {
    isMinimized: false,
    previousRoute: null,
  },
  Support: {
    isMinimized: false,
    previousRoute: null,
  },
  About: {
    isMinimized: true,
    previousRoute: '/more',
  },
  Settings: {
    isMinimized: false,
    previousRoute: null,
  },
  SettingsCurrency: {
    isMinimized: true,
    previousRoute: '/settings',
  },
  SettingsDevelopment: {
    isMinimized: true,
    previousRoute: '/settings',
  },
  SettingsLanguage: {
    isMinimized: true,
    previousRoute: '/settings',
  },
  SettingsPassword: {
    isMinimized: true,
    previousRoute: '/settings',
  },
  Wallets: {
    isMinimized: true,
    previousRoute: '/',
  },
  WalletsCreate: {
    isMinimized: true,
    previousRoute: '/wallets',
  },
  WalletsImport: {
    isMinimized: true,
    previousRoute: '/wallets',
  },
  WalletsItemAddresses: {
    isMinimized: true,
    previousRoute: '/wallets',
  },
  WalletsItemBackup: {
    isMinimized: true,
    previousRoute: '/wallets',
  },
  WalletsItemModeDisable: {
    isMinimized: true,
    previousRoute: '/wallets',
  },
}

export function getMenuMeta(name: string): MenuMeta {
  return MENU_META[name] || MENU_META_DEFAULT
}
