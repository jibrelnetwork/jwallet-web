import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'all',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const AllTransactions = require('./containers/AllTransactionsContainer').default
      const transactions = require('../../modules/transactions').default
      injectReducer(store, { key: 'transactions', reducer: transactions })
      cb(null, AllTransactions)
    }, 'all-transactions')
  },
})
