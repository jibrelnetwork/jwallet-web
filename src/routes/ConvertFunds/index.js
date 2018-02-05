import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'convert-funds',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ConvertFunds = require('./containers/ConvertFundsContainer').default
      const convertFunds = require('./modules/convertFunds').default
      injectReducer(store, { key: 'convertFunds', reducer: convertFunds })
      cb(null, ConvertFunds)
    }, 'convert-funds')
  },
})
