// @flow

import WalletsLayout from 'layouts/WalletsLayout'

import NotFound from './containers/NotFoundContainer'

export default () => ({
  path: '*',
  component: WalletsLayout,
  indexRoute: {
    component: NotFound,
  },
})
