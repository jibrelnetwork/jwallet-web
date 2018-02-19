import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'backup',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const BackupKeys = require('./containers/BackupKeysContainer').default
      const backupKeys = require('./modules/backupKeys').default
      injectReducer(store, { key: 'backupKeys', reducer: backupKeys })
      cb(null, BackupKeys)
    }, 'backup')
  },
})
