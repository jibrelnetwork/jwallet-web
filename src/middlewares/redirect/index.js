import { LOCATION_CHANGE, push } from 'react-router-redux'
import { REHYDRATE } from 'redux-persist'

import {
  agreement,
  firstTime,
  readonly,
  root,
  selectedWallet,
  upgrade,
  walletsAddresses,
} from './filters'

const isFullyHydrated = state =>
  Object.keys(state).reduce((memo, id) => {
    if (state[id]._persist) {
      return memo && state[id]._persist.rehydrated
    }
    return memo
  }, true)

export const redirect = ({ getState }) => next => (action) => {
  next(action)
  switch (action.type) {
    case REHYDRATE:
    case LOCATION_CHANGE: {
      const state = getState()
      if (isFullyHydrated(state)) {
        const pathname = action.type === LOCATION_CHANGE ?
          action.payload.pathname :
          (
            state.router &&
            state.router.locationBeforeTransitions &&
            state.router.locationBeforeTransitions.pathname
          )

        // order is important!
        const redirectPathname = [
          agreement,
          firstTime,
          readonly,
          selectedWallet,
          root,
          upgrade,
          walletsAddresses,
        ].reduce((memo, fn) =>
          fn(state, memo), pathname
        )

        if (redirectPathname !== pathname) {
          next(push(redirectPathname))
        }
      }
      break
    }
    default: {
      break
    }
  }
}
