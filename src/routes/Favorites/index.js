// @flow

import { MenuLayout } from 'layouts'

import FavoritesIndex from './FavoritesIndexViewContainer'

export default {
  path: 'favorites',
  component: MenuLayout,
  indexRoute: {
    component: FavoritesIndex,
  },
}
