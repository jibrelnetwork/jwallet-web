// @flow

import storage from 'localforage'
import { combineReducers, type Reducer } from 'redux'
import { persistReducer } from 'redux-persist'
import { routerReducer as router } from 'react-router-redux'

// import { type AllActions } from 'routes'

// wallets
import wallets from 'routes/Wallets/modules/wallets'
// import transactions from 'routes/Transactions/modules/transactions'
import walletsCreate from 'routes/Wallets/routes/Create/modules/walletsCreate'
import walletsImport from 'routes/Wallets/routes/Import/modules/walletsImport'
import walletsBackup from 'routes/Wallets/routes/Backup/modules/walletsBackup'
import walletsAddresses from 'routes/Wallets/routes/Addresses/modules/walletsAddresses'
import walletsRenameAddress from 'routes/Wallets/routes/RenameAddress/modules/walletsRenameAddress'

// networks
// import networks from 'routes/modules/networks'

// digitalAssets
import { reducers as digitalAssets } from 'routes/DigitalAssets'

const persistConfig = {
  storage,
  key: 'jwallet-web',
  whitelist: ['wallets', 'walletsAddresses'],
}

export function makeRootReducer(): Reducer<AppState, any> {
  const rootReducer = combineReducers({
    // wallets
    wallets,
    walletsCreate,
    walletsImport,
    walletsBackup,
    walletsAddresses,
    walletsRenameAddress,
    // networks
    // networks,
    // digitalAssets
    ...digitalAssets,
    // transactions
    // transactions,
    // router
    router,
  })

  return persistReducer(persistConfig, rootReducer)
}
