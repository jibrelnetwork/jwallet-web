// @flow

import WalletsLayout from 'layouts/WalletsLayout'

import AgreementsView from './AgreementsViewContainer'

export default {
  path: 'agreements',
  component: WalletsLayout,
  indexRoute: {
    component: AgreementsView,
  },
}
