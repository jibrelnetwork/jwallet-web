// @flow

import WalletsLayout from 'layouts/WalletsLayout'

import NotFoundView from './NotFoundView'

export default {
  path: '*',
  component: WalletsLayout,
  indexRoute: {
    component: NotFoundView,
  },
}
