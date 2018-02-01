import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'receive-funds',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ReceiveFunds = require('./containers/ReceiveFundsContainer').default

      cb(null, ReceiveFunds)
    }, 'receive-funds')
  },
})
