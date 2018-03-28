import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'all',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const AllTransactions = require('./containers/AllTransactionsContainer').default

      const transactions = require('../../modules/transactions').default
      const send = require('../../../Funds/routes/SendFunds/modules/sendFunds').default
      const receive = require('../../../Funds/routes/ReceiveFunds/modules/receiveFunds').default

      injectReducer(store, { key: 'transactions', reducer: transactions })
      injectReducer(store, { key: 'sendFunds', reducer: send })
      injectReducer(store, { key: 'receiveFunds', reducer: receive })

      cb(null, AllTransactions)
    }, 'all-transactions')
  },
})
