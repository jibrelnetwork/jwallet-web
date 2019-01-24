import { newWalletEvents } from './newWalletEvents'
import { userParams } from './userParams'

export const analyticsMiddleware = store => next => (action) => {
  newWalletEvents(store.getState(), action)
  next(action)
  userParams(store.getState(), action)
}
