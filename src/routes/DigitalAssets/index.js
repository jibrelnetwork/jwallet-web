import DigitalAssetsLayout from 'layouts/DigitalAssets'

import List from './routes/List'

export default {
  path: 'digital-assets',
  component: DigitalAssetsLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/digital-assets/list') },
  childRoutes: [
    List,
  ],
}
