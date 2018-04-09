import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'add',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const CustomAsset = require('../../containers/CustomAssetContainer').default
      const customAsset = require('../../modules/customAsset').default
      injectReducer(store, { key: 'customAsset', reducer: customAsset })
      cb(null, CustomAsset)
    }, 'custom-asset-add')
  },
})
