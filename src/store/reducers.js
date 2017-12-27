import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import currencies from 'routes/JWallet/modules/currencies'
import keystore from 'routes/JWallet/modules/keystore'
import networks from 'routes/JWallet/modules/networks'
import transactions from 'routes/JWallet/modules/transactions'

import alphaWarningModal from 'routes/JWallet/modules/modals/alphaWarning'
import backupKeystoreModal from 'routes/JWallet/modules/modals/backupKeystore'
import clearKeystoreModal from 'routes/JWallet/modules/modals/clearKeystore'
import convertFundsModal from 'routes/JWallet/modules/modals/convertFunds'
import customTokenModal from 'routes/JWallet/modules/modals/customToken'
import importKeystoreAccountModal from 'routes/JWallet/modules/modals/importKeystoreAccount'
import newDerivationPathModal from 'routes/JWallet/modules/modals/newDerivationPath'
import newKeystoreAccountModal from 'routes/JWallet/modules/modals/newKeystoreAccount'
import newKeystorePasswordModal from 'routes/JWallet/modules/modals/newKeystorePassword'
import receiveFundsModal from 'routes/JWallet/modules/modals/receiveFunds'
import sendFundsModal from 'routes/JWallet/modules/modals/sendFunds'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    currencies,
    keystore,
    networks,
    transactions,
    alphaWarningModal,
    backupKeystoreModal,
    clearKeystoreModal,
    convertFundsModal,
    customTokenModal,
    importKeystoreAccountModal,
    newDerivationPathModal,
    newKeystoreAccountModal,
    newKeystorePasswordModal,
    receiveFundsModal,
    sendFundsModal,
    router,
    ...asyncReducers,
  })
}

/* eslint-disable no-param-reassign */
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}
