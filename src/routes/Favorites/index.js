// @flow

import MenuLayout from 'layouts/MenuLayout'

import Address from './routes/Address'
import FavoritesIndex from './FavoritesIndexViewContainer'

export default {
  path: 'favorites',
  component: MenuLayout,
  indexRoute: {
    component: FavoritesIndex,
  },
  childRoutes: [
    Address,
  ],
}
