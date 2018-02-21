import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'import-key',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ImportKey = require('./containers/ImportKeyContainer').default

      cb(null, ImportKey)
    }, 'import-key')
  },
})
