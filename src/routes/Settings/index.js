// @flow

import { MenuLayout } from 'layouts'

import SettingsIndex from './SettingsIndexViewContainer'

export default {
  path: 'settings',
  component: MenuLayout,
  indexRoute: {
    component: SettingsIndex,
  },
}
