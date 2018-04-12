import DigitalAssetsLayout from 'layouts/DigitalAssetsLayout'

import Balance from './routes/Balance'
import Custom from './routes/Custom'
import Popular from './routes/Popular'

export default store => ({
  path: 'digital-assets',
  component: DigitalAssetsLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/digital-assets/balance') },
  childRoutes: [
    Custom(store),
    Popular(store),
    Balance(store),
  ],
})
