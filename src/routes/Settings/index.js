// @flow

import MenuLayout from 'layouts/MenuLayout'

import SettingsIndex from './SettingsIndexViewContainer'

export default {
  path: 'settings',
  component: MenuLayout,
  indexRoute: {
    component: SettingsIndex,
  },
}
