// @flow
// Send data to analytics

// import { SOME_ACTION } from '..'
// import { gtm } from 'services'

/* eslint-disable */
export const send = () => (next: any) => (action: any) => {
  // if (action.type === SOME_ACTION) {
  //   gtm.someEvent()
  // }
  return next(action)
}
