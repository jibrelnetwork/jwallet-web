import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'send-funds',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const SendFunds = require('./containers/SendFundsContainer').default

      cb(null, SendFunds)
    }, 'send-funds')
  },
})
