// @flow strict

import { isEmpty } from 'lodash-es'

export function initRemote(network: Network) {
  if (!network) {
    throw new Error('Network is not defined.')
  }

  const {
    rpcaddr,
    rpcport,
    ssl,
  } = network

  return (web3Method: Function, mergeProps: Object): Function =>
    // eslint-disable-next-line fp/no-rest-parameters
    (...args): Function => {
      const props = !isEmpty(mergeProps)
        ? mergeProps
        : {}

      return web3Method({
        ...props,
        rpcaddr,
        rpcport,
        ssl,
      }, ...args)
    }
}
