import DigitalAssetsLayout from 'layouts/DigitalAssets'

import Add from './routes/Add'

export default {
  path: 'custom-asset',
  component: DigitalAssetsLayout,
  childRoutes: [
    Add,
  ],
  indexRoute: {
    onEnter: (nextState, replace) => replace('/custom-asset/add'),
  },
}
