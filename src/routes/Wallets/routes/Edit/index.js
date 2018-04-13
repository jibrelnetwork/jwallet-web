import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'edit',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const View = require('./containers/WalletsEditViewContainer').default
      const editWallet = require('./modules/editWallet').default
      injectReducer(store, { key: 'editWallet', reducer: editWallet })
      cb(null, View)
    }, 'wallets-edit')
  },
})
