// @flow

import View from './FavoritesAddressViewContainer'

export default {
  path: 'address',
  component: View,
  childRoutes: [{
    path: ':address',
    component: View,
  }],
}
