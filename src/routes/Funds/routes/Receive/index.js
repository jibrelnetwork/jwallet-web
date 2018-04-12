import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'receive',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const FundsReceiveView = require('./containers/FundsReceiveViewContainer').default
      const receiveFunds = require('./modules/receiveFunds').default
      injectReducer(store, { key: 'receiveFunds', reducer: receiveFunds })
      cb(null, FundsReceiveView)
    }, 'receive')
  },
})
