import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'import-key',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ImportKey = require('./containers/ImportKeyContainer').default
      const importKey = require('./modules/importKey').default
      injectReducer(store, { key: 'importKey', reducer: importKey })
      cb(null, ImportKey)
    }, 'import-key')
  },
})
