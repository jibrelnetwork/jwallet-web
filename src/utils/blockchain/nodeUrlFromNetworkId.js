// @flow strict

import {
  MAINNET,
  NETWORKS,
} from 'data/networks'

export function nodeUrlFromNetworkId(networkId: string): string {
  const network = NETWORKS[networkId] || NETWORKS[MAINNET]
  const protocol = network.ssl ? 'https' : 'http'

  return `${protocol}://${network.rpcaddr}:${network.rpcport}`
}
