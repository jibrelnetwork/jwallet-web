import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'clear-keys',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ClearKeys = require('./containers/ClearKeysContainer').default
      const clearKeys = require('./modules/clearKeys').default
      injectReducer(store, { key: 'clearKeys', reducer: clearKeys })
      cb(null, ClearKeys)
    }, 'clear-keys')
  },
})
