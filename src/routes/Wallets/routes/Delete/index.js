import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'remove',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const View = require('./containers/WalletsRemoveViewContainer').default
      const removeWallet = require('./modules/removeWallet').default
      injectReducer(store, { key: 'removeWallet', reducer: removeWallet })
      cb(null, View)
    }, 'wallets-remove')
  },
})
