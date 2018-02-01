import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'convert-funds',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ConvertFunds = require('./containers/ConvertFundsContainer').default

      cb(null, ConvertFunds)
    }, 'convert-funds')
  },
})
