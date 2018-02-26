import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'create',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const CreateWallet = require('./containers/CreateWalletContainer').default
      const createWallet = require('./modules/createWallet').default
      injectReducer(store, { key: 'createWallet', reducer: createWallet })
      cb(null, CreateWallet)
    }, 'create')
  },
})
