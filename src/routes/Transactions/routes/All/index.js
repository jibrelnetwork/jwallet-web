import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'all',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const View = require('./containers/TransactionsAllViewContainer').default

      const transactions = require('../../modules/transactions').default
      const send = require('../../../Funds/routes/Send/modules/sendFunds').default
      const receive = require('../../../Funds/routes/Receive/modules/receiveFunds').default

      injectReducer(store, { key: 'transactions', reducer: transactions })
      injectReducer(store, { key: 'sendFunds', reducer: send })
      injectReducer(store, { key: 'receiveFunds', reducer: receive })

      cb(null, View)
    }, 'transactions-all')
  },
})
