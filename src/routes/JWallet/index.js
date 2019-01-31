import { injectReducer } from 'store/reducers'

export default store => ({
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const JWallet = require('./containers/JWalletContainer').default

      const currencies = require('./modules/currencies').default
      const keystore = require('./modules/keystore').default
      const networks = require('./modules/networks').default
      const transactions = require('./modules/transactions').default

      const alphaWarningModal = require('./modules/modals/alphaWarning').default
      const backupKeystoreModal = require('./modules/modals/backupKeystore').default
      const clearKeystoreModal = require('./modules/modals/clearKeystore').default
      const convertFundsModal = require('./modules/modals/convertFunds').default
      const customTokenModal = require('./modules/modals/customToken').default
      const importKeystoreAccountModal = require('./modules/modals/importKeystoreAccount').default
      const newDerivationPathModal = require('./modules/modals/newDerivationPath').default
      const newKeystoreAccountModal = require('./modules/modals/newKeystoreAccount').default
      const newKeystorePasswordModal = require('./modules/modals/newKeystorePassword').default
      const receiveFundsModal = require('./modules/modals/receiveFunds').default
      const sendFundsModal = require('./modules/modals/sendFunds').default

      injectReducer(store, { key: 'currencies', reducer: currencies })
      injectReducer(store, { key: 'keystore', reducer: keystore })
      injectReducer(store, { key: 'networks', reducer: networks })
      injectReducer(store, { key: 'transactions', reducer: transactions })

      injectReducer(store, { key: 'alphaWarningModal', reducer: alphaWarningModal })
      injectReducer(store, { key: 'backupKeystoreModal', reducer: backupKeystoreModal })
      injectReducer(store, { key: 'clearKeystoreModal', reducer: clearKeystoreModal })
      injectReducer(store, { key: 'convertFundsModal', reducer: convertFundsModal })
      injectReducer(store, { key: 'customTokenModal', reducer: customTokenModal })
      injectReducer(store, { key: 'importKeystoreAccountModal', reducer: importKeystoreAccountModal }) // eslint-disable-line max-len
      injectReducer(store, { key: 'newDerivationPathModal', reducer: newDerivationPathModal })
      injectReducer(store, { key: 'newKeystoreAccountModal', reducer: newKeystoreAccountModal })
      injectReducer(store, { key: 'newKeystorePasswordModal', reducer: newKeystorePasswordModal })
      injectReducer(store, { key: 'receiveFundsModal', reducer: receiveFundsModal })
      injectReducer(store, { key: 'sendFundsModal', reducer: sendFundsModal })

      cb(null, JWallet)
    }, '')
  },
})
