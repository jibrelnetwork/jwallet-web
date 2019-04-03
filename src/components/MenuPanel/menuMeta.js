// @flow

export type MenuMeta = {
  isMinimized: boolean,
  previousRouteNameFallback: ?string,
}

const MENU_META_DEFAULT: MenuMeta = {
  isMinimized: false,
  previousRouteNameFallback: null,
}

const MENU_META: { [string]: ?MenuMeta } = {
  Home: {
    isMinimized: false,
    previousRouteNameFallback: null,
  },
  Send: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  Receive: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  AssetsItem: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  AssetsItemEdit: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  AssetsItemAdd: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  History: {
    isMinimized: false,
    previousRouteNameFallback: null,
  },
  HistoryItem: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  Contacts: {
    isMinimized: false,
    previousRouteNameFallback: null,
  },
  ContactsItemAdd: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  ContactsItemEdit: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  MoreActions: {
    isMinimized: false,
    previousRouteNameFallback: null,
  },
  Support: {
    isMinimized: false,
    previousRouteNameFallback: null,
  },
  About: {
    isMinimized: true,
    previousRouteNameFallback: 'MoreActions',
  },
  Settings: {
    isMinimized: false,
    previousRouteNameFallback: null,
  },
  SettingsCurrency: {
    isMinimized: true,
    previousRouteNameFallback: 'Settings',
  },
  SettingsDevelopment: {
    isMinimized: true,
    previousRouteNameFallback: 'Settings',
  },
  SettingsLanguage: {
    isMinimized: true,
    previousRouteNameFallback: 'Settings',
  },
  SettingsSecurityPassword: {
    isMinimized: true,
    previousRouteNameFallback: 'Settings',
  },
  Wallets: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  WalletsCreate: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  WalletsImport: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  WalletsItem: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  WalletsItemBackup: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  WalletsItemDelete: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  WalletsItemRename: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
  WalletsItemUpgrade: {
    isMinimized: true,
    previousRouteNameFallback: 'Home',
  },
}

export function getMenuMeta(name: string): MenuMeta {
  return MENU_META[name] || MENU_META_DEFAULT
}
