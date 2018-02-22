import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'backup',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const BackupWallet = require('./containers/BackupWalletContainer').default
      const backupWallet = require('./modules/backupWallet').default
      injectReducer(store, { key: 'backupWallet', reducer: backupWallet })
      cb(null, BackupWallet)
    }, 'backup')
  },
})
