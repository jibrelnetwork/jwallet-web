// @flow

import WalletsLayout from 'layouts/WalletsLayout'

import NotFoundView from './NotFoundViewContainer'

export default {
  path: '*',
  component: WalletsLayout,
  indexRoute: {
    component: NotFoundView,
  },
}
