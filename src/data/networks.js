// @flow strict

export const MAINNET = 'mainnet'
export const ROPSTEN = 'ropsten'
export const RINKEBY = 'rinkeby'
export const KOVAN = 'kovan'

export const NETWORKS = {
  [MAINNET]: {
    id: MAINNET,
    blockExplorerUISubdomain: '',
    rpcaddr: 'main.jnode.network',
    rpcport: 443,
    ssl: true,
  },
  [ROPSTEN]: {
    id: ROPSTEN,
    blockExplorerUISubdomain: 'ropsten',
    rpcaddr: 'ropsten.jnode.network',
    rpcport: 443,
    ssl: true,
  },
  [RINKEBY]: {
    id: RINKEBY,
    blockExplorerUISubdomain: 'rinkeby',
    rpcaddr: 'rinkeby.jnode.network',
    rpcport: 443,
    ssl: true,
  },
  [KOVAN]: {
    id: KOVAN,
    blockExplorerUISubdomain: 'kovan',
    rpcaddr: 'kovan.jnode.network',
    rpcport: 443,
    ssl: true,
  },
}

export const NETWORKS_AVAILABLE = [MAINNET, ROPSTEN]
