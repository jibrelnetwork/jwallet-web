import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'incoming',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const IncomingTransactions = require('./containers/IncomingTransactionsContainer').default
      const transactions = require('../../modules/transactions').default
      injectReducer(store, { key: 'transactions', reducer: transactions })
      cb(null, IncomingTransactions)
    }, 'incoming-transactions')
  },
})
