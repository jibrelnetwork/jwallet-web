import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'jwallet',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const JWallet = require('./containers/JWalletContainer').default

      const currencies = require('./modules/currencies').default
      const funds = require('./modules/funds').default
      const keystore = require('./modules/keystore').default
      const networks = require('./modules/networks').default
      const transactions = require('./modules/transactions').default

      const newKeystorePassword = require('./modules/modals/newKeystorePassword').default

      injectReducer(store, { key: 'currencies', reducer: currencies })
      injectReducer(store, { key: 'funds', reducer: funds })
      injectReducer(store, { key: 'keystore', reducer: keystore })
      injectReducer(store, { key: 'networks', reducer: networks })
      injectReducer(store, { key: 'transactions', reducer: transactions })

      injectReducer(store, { key: 'newKeystorePasswordModal', reducer: newKeystorePassword })

      cb(null, JWallet)
    }, 'jwallet')
  },
})
