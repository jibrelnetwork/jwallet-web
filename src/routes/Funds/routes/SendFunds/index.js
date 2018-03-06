import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'send',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const SendFunds = require('./containers/SendFundsContainer').default
      const sendFunds = require('./modules/sendFunds').default
      injectReducer(store, { key: 'sendFunds', reducer: sendFunds })
      cb(null, SendFunds)
    }, 'send')
  },
})
