import DigitalAssetsLayout from 'layouts/DigitalAssetsLayout'

import WithBalance from './routes/WithBalance'
import Popular from './routes/Popular'

export default store => ({
  path: 'digital-assets',
  component: DigitalAssetsLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/digital-assets/with-balance') },
  childRoutes: [
    WithBalance(store),
    Popular(store),
  ],
})
