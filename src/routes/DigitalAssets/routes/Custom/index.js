import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'custom',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Custom = require('./containers/CustomContainer').default
      const customAsset = require('../../../CustomAsset/modules/customAsset').default
      injectReducer(store, { key: 'customAsset', reducer: customAsset })
      cb(null, Custom)
    }, 'custom')
  },
})
