import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'add-custom-asset',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const AddCustomAsset = require('./containers/AddCustomAssetContainer').default

      cb(null, AddCustomAsset)
    }, 'add-custom-asset')
  },
})
