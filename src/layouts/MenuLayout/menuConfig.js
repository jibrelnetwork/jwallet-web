// @flow

import { type MenuMode } from './components/MainMenu'

const MENU_META_DEFAULT = {
  menu: null,
  previousRouteNameFallback: null,
}

export const menuConfig = {
  Home: {
    menu: null,
    previousRouteNameFallback: null,
  },
  Send: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  Receive: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  AssetsItem: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  AssetsItemEdit: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  AssetsItemAdd: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  History: {
    menu: null,
    previousRouteNameFallback: null,
  },
  HistoryItem: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  Contacts: {
    menu: null,
    previousRouteNameFallback: null,
  },
  ContactsItemAdd: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  ContactsItemEdit: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  MoreActions: {
    menu: null,
    previousRouteNameFallback: null,
  },
  Support: {
    menu: null,
    previousRouteNameFallback: null,
  },
  About: {
    menu: 'minimized',
    previousRouteNameFallback: 'MoreActions',
  },
  Settings: {
    menu: null,
    previousRouteNameFallback: null,
  },
  SettingsCurrency: {
    menu: 'minimized',
    previousRouteNameFallback: 'Settings',
  },
  SettingsDevelopment: {
    menu: 'minimized',
    previousRouteNameFallback: 'Settings',
  },
  SettingsLanguage: {
    menu: 'minimized',
    previousRouteNameFallback: 'Settings',
  },
  SettingsSecurityPassword: {
    menu: 'minimized',
    previousRouteNameFallback: 'Settings',
  },
  Wallets: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  WalletsCreate: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  WalletsImport: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  WalletsItem: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  WalletsItemBackup: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  WalletsItemRemove: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  WalletsItemRename: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
  WalletsItemUpgrade: {
    menu: 'minimized',
    previousRouteNameFallback: 'Home',
  },
}

export function getMenuConfig(name: string): {
  menu: MenuMode,
  previousRouteNameFallback: string,
} {
  return menuConfig[name] || MENU_META_DEFAULT
}
