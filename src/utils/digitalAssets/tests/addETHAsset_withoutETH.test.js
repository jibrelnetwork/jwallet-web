// @flow strict

import addETHAsset from '../addETHAsset'

const ETH_ADDRESS: AssetAddress = 'Ethereum'

jest.mock('../../../data/assets/getAssets', () => ({
  getAssetsMainnet: () => [{
    name: 'Jibrel Network Token',
    symbol: 'JNT',
    blockchainParams: {
      'type': 'erc-20',
      'address': '0xa5fd1a791c4dfcaacc963d4f73c6ae5824149ea7',
      'decimals': 18,
    },
  }],
}))

describe('addETHAsset with getAssetsMainnet ETH excluded result mock', () => {
  test('ETH asset will be added correctly', async () => {
    const result: DigitalAssets = await addETHAsset({})
    const eth: ?DigitalAsset = result[ETH_ADDRESS]

    if (!eth) {
      throw new Error('ETH asset not found')
    }

    expect(eth).toBeDefined()
    expect(eth.symbol).toEqual('ETH')
    expect(eth.name).toEqual('Ethereum')
    expect(eth.blockchainParams).toBeDefined()
    expect(eth.blockchainParams.address).toEqual(ETH_ADDRESS)
  })
})
