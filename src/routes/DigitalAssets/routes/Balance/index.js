import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'balance',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Balance = require('./containers/BalanceContainer').default
      const customAsset = require('../../../CustomAsset/modules/customAsset').default
      injectReducer(store, { key: 'customAsset', reducer: customAsset })
      cb(null, Balance)
    }, 'balance')
  },
})
