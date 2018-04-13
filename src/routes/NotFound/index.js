// @flow

import WalletsLayout from 'layouts/WalletsLayout'

import NotFoundView from './containers/NotFoundViewContainer'

export default () => ({
  path: '*',
  component: WalletsLayout,
  indexRoute: {
    component: NotFoundView,
  },
})
