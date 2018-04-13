import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'create',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const View = require('./containers/WalletsCreateViewContainer').default
      const createWallet = require('./modules/createWallet').default
      injectReducer(store, { key: 'createWallet', reducer: createWallet })
      cb(null, View)
    }, 'wallets-create')
  },
})
