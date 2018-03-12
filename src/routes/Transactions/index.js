import TransactionsLayout from 'layouts/TransactionsLayout'

import All from './routes/All'
import Incoming from './routes/Incoming'
import Outgoing from './routes/Outgoing'

export default store => ({
  path: 'transactions',
  component: TransactionsLayout,
  indexRoute: { onEnter: (nextState, replace) => replace('/transactions/all') },
  childRoutes: [
    All(store),
    Incoming(store),
    Outgoing(store),
  ],
})
