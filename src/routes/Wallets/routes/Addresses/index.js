import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'addresses',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const MnemonicAddresses = require('./containers/MnemonicAddressesContainer').default
      const mnemonicAddresses = require('./modules/mnemonicAddresses').default
      injectReducer(store, { key: 'mnemonicAddresses', reducer: mnemonicAddresses })
      cb(null, MnemonicAddresses)
    }, 'addresses')
  },
})
