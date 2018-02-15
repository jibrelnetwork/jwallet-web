// @flow
// Redirects

// import { SOME_ACTION } from '..'
// import * as router from 'react-router-redux'

/* eslint-disable */
export const redirect = () => (next: any) => (action: any) => {
  // if (action.type === SOME_ACTION) {
  //   router.push('/some_path')
  // }
  return next(action)
}
