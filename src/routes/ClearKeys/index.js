import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'clear-keys',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ClearKeys = require('./containers/ClearKeysContainer').default

      cb(null, ClearKeys)
    }, 'clear-keys')
  },
})
