import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'edit',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const EditWallet = require('./containers/EditWalletContainer').default
      const editWallet = require('./modules/editWallet').default
      injectReducer(store, { key: 'editWallet', reducer: editWallet })
      cb(null, EditWallet)
    }, 'edit')
  },
})
