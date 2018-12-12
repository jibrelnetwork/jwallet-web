// @flow

import { MenuLayout } from 'layouts'

import SettingsIndex from './SettingsIndexViewContainer'
import SecurityPassword from './routes/SecurityPassword'

export default {
  path: 'settings',
  component: MenuLayout,
  indexRoute: {
    component: SettingsIndex,
  },
  childRoutes: [
    SecurityPassword,
  ],
}
