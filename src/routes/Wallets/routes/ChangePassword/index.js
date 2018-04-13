import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'change-password',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const View = require('./containers/WalletsChangePasswordViewContainer').default
      const changeWalletPassword = require('./modules/changeWalletPassword').default
      injectReducer(store, { key: 'changeWalletPassword', reducer: changeWalletPassword })
      cb(null, View)
    }, 'wallets-change-password')
  },
})
