import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'change-password',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ChangeWalletPassword = require('./containers/ChangeWalletPasswordContainer').default
      const changeWalletPassword = require('./modules/changeWalletPassword').default
      injectReducer(store, { key: 'changeWalletPassword', reducer: changeWalletPassword })
      cb(null, ChangeWalletPassword)
    }, 'change-password')
  },
})
