import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'jwallet',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const JWallet = require('./containers/JWalletContainer').default

      const funds = require('./modules/funds').default
      const keys = require('./modules/keys').default

      injectReducer(store, { key: 'funds', reducer: funds })
      injectReducer(store, { key: 'keys', reducer: keys })

      cb(null, JWallet)
    }, 'jwallet')
  },
})
