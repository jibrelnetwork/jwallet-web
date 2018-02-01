import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'keys',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Keys = require('./containers/KeysContainer').default

      cb(null, Keys)
    }, 'keys')
  },
})
