import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'import',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ImportWallet = require('./containers/ImportWalletContainer').default
      const importWallet = require('./modules/importWallet').default
      injectReducer(store, { key: 'importWallet', reducer: importWallet })
      cb(null, ImportWallet)
    }, 'import')
  },
})
