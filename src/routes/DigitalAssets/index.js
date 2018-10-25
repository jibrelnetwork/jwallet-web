// @flow

import { AsideLayout } from 'layouts'
// import DigitalAssetsListView from './routes/List/DigitalAssetsGridView'

import Grid from './routes/Grid'

export default {
  path: 'digital-assets',
  component: AsideLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/digital-assets/grid') },
  childRoutes: [
    Grid,
  ],
}
