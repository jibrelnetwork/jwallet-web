// @flow

import { AsideLayout } from 'layouts'

import Grid from './routes/Grid'

export default {
  path: 'digital-assets',
  component: AsideLayout,
  indexRoute: {
    onEnter: (nextState: State, replace: (string) => void) => replace('/digital-assets/grid'),
  },
  childRoutes: [
    Grid,
  ],
}
