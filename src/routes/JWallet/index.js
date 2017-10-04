import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'jwallet',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const JWallet = require('./containers/JWalletContainer').default

      const accounts = require('./modules/accounts').default
      const funds = require('./modules/funds').default
      const keystore = require('./modules/keystore').default
      const networks = require('./modules/networks').default
      const transactions = require('./modules/transactions').default

      injectReducer(store, { key: 'accounts', reducer: accounts })
      injectReducer(store, { key: 'funds', reducer: funds })
      injectReducer(store, { key: 'keystore', reducer: keystore })
      injectReducer(store, { key: 'networks', reducer: networks })
      injectReducer(store, { key: 'transactions', reducer: transactions })

      cb(null, JWallet)
    }, 'jwallet')
  },
})
