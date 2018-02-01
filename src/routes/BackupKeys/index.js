import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'backup-keys',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const BackupKeys = require('./containers/BackupKeysContainer').default

      cb(null, BackupKeys)
    }, 'backup-keys')
  },
})
