import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'import',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const View = require('./containers/WalletsImportViewContainer').default
      const importWallet = require('./modules/importWallet').default
      injectReducer(store, { key: 'importWallet', reducer: importWallet })
      cb(null, View)
    }, 'wallets-import')
  },
})
