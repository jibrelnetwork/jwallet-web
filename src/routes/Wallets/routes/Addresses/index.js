import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'addresses',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const View = require('./containers/WalletsMnemonicAddressesViewContainer').default
      const mnemonicAddresses = require('./modules/mnemonicAddresses').default
      injectReducer(store, { key: 'mnemonicAddresses', reducer: mnemonicAddresses })
      cb(null, View)
    }, 'wallets-addresses')
  },
})
