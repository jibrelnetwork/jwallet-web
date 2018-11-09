// @flow

import storage from 'localforage'
import { combineReducers, type Reducer } from 'redux'
import { persistReducer } from 'redux-persist'
import { routerReducer as router } from 'react-router-redux'

import { type AppActions } from 'routes'

// wallets
import wallets from 'routes/Wallets/modules/wallets'
import walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'
import walletsBackup from 'routes/Wallets/routes/Backup/modules/walletsBackup'
import walletsAddresses from 'routes/Wallets/routes/Addresses/modules/walletsAddresses'
import walletsRenameAddress from 'routes/Wallets/routes/RenameAddress/modules/walletsRenameAddress'

// networks
import networks from 'routes/modules/networks'

// transactions
import transactions from 'routes/Transactions/modules/transactions'

// digitalAssets
import { reducers as digitalAssets } from 'routes/DigitalAssets'

const persistConfig = {
  storage,
  key: 'jwallet-web',
  whitelist: ['wallets', 'walletsAddresses'],
}

export function makeRootReducer() {
  const rootReducer: Reducer<AppState, AppActions> = combineReducers({
    // wallets
    wallets,
    walletsCreate,
    walletsImport,
    walletsBackup,
    walletsAddresses,
    walletsRenameAddress,
    // networks
    networks,
    // digitalAssets
    ...digitalAssets,
    // transactions
    transactions,
    // router
    router,
  })

  return persistReducer/* :: < AppState, AppActions > */(persistConfig, rootReducer)
}
