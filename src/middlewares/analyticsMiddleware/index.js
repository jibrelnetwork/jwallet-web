import { newWalletEvents } from './newWalletEvents'
import { sendTransactionEvents } from './sendTransactionEvents'
import { userParams } from './userParams'

export const analyticsMiddleware = store => next => (action) => {
  try {
    const startState = store.getState()
    newWalletEvents(startState, action)
    sendTransactionEvents(startState, action)
  } catch (err) {
    // do nothing
  }
  next(action)
  try {
    userParams(store.getState(), action)
  } catch (err) {
    // do nothing
  }
}
