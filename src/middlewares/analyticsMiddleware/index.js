import { newWalletEvents } from './newWalletEvents'
import { sendTransactionEvents } from './sendTransactionEvents'
import { userParams } from './userParams'
import { resyncTransactionsEvents } from './resyncTransactionsEvents'

// Declare here all Google analytics events:
// @see https://jibrelnetwork.atlassian.net/wiki/x/BoD7JQ
export const analyticsMiddleware = store => next => (action) => {
  try {
    const startState = store.getState()
    newWalletEvents(startState, action)
    sendTransactionEvents(startState, action)
    resyncTransactionsEvents(startState, action)
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
