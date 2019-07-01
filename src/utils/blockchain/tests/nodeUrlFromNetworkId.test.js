import {
  MAINNET,
  RINKEBY,
} from 'data/networks'

import { nodeUrlFromNetworkId } from '../nodeUrlFromNetworkId'

describe('nodeUrlFromNetworkId', () => {
  it('is available', () => {
    expect(nodeUrlFromNetworkId).toBeDefined()
  })

  it('returns mainnet URL if mainnet id is passed', () => {
    expect(nodeUrlFromNetworkId(MAINNET)).toBe('https://main.jnode.network:443')
  })

  it('returns rinkeby URL if rinkeby id is passed', () => {
    expect(nodeUrlFromNetworkId(RINKEBY)).toBe('https://rinkeby.jnode.network:443')
  })

  it('returns mainnet URL if unknown id is passed', () => {
    expect(nodeUrlFromNetworkId('test')).toBe('https://main.jnode.network:443')
  })
})
