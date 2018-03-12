import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'outgoing',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const OutgoingTransactions = require('./containers/OutgoingTransactionsContainer').default
      const transactions = require('../../modules/transactions').default
      injectReducer(store, { key: 'transactions', reducer: transactions })
      cb(null, OutgoingTransactions)
    }, 'outgoing-transactions')
  },
})

