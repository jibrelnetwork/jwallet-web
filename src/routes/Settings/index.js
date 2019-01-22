// @flow

import { MenuLayout } from 'layouts'

import SettingsIndex from './SettingsIndexViewContainer'
import PaymentPassword from './routes/PaymentPassword'
import Currency from './routes/Currency'

export default {
  path: 'settings',
  component: MenuLayout,
  indexRoute: {
    component: SettingsIndex,
  },
  childRoutes: [
    PaymentPassword,
    Currency,
  ],
}
