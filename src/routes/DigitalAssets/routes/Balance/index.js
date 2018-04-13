import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'balance',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const View = require('./containers/DigitalAssetsBalanceViewContainer').default
      const customAsset = require('../../../CustomAsset/modules/customAsset').default
      injectReducer(store, { key: 'customAsset', reducer: customAsset })
      cb(null, View)
    }, 'digital-assets-balance')
  },
})
