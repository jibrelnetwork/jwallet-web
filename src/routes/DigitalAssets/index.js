import DigitalAssetsLayout from 'layouts/DigitalAssetsLayout'

import Custom from './routes/Custom'
import Popular from './routes/Popular'
import WithBalance from './routes/WithBalance'

export default store => ({
  path: 'digital-assets',
  component: DigitalAssetsLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/digital-assets/balance') },
  childRoutes: [
    Custom(store),
    Popular(store),
    WithBalance(store),
  ],
})
