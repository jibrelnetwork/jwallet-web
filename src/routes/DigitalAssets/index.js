import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'digital-assets',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const DigitalAssets = require('./containers/DigitalAssetsContainer').default

      cb(null, DigitalAssets)
    }, 'digital-assets')
  },
})
