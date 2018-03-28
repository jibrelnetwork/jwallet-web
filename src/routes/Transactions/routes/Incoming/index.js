import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'incoming',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const IncomingTransactions = require('./containers/IncomingTransactionsContainer').default

      const transactions = require('../../modules/transactions').default
      const send = require('../../../Funds/routes/SendFunds/modules/sendFunds').default
      const receive = require('../../../Funds/routes/ReceiveFunds/modules/receiveFunds').default

      injectReducer(store, { key: 'transactions', reducer: transactions })
      injectReducer(store, { key: 'sendFunds', reducer: send })
      injectReducer(store, { key: 'receiveFunds', reducer: receive })

      cb(null, IncomingTransactions)
    }, 'incoming-transactions')
  },
})
