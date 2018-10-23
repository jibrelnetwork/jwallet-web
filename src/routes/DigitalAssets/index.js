import DigitalAssetsLayout from 'layouts/DigitalAssets'

import Balance from './routes/Balance'
import Custom from './routes/Custom'
import Popular from './routes/Popular'

export default {
  path: 'digital-assets',
  component: DigitalAssetsLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/digital-assets/balance') },
  childRoutes: [
    Custom,
    Popular,
    Balance,
  ],
}
