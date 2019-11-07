// @flow strict

import addETHAsset from '../addETHAsset'

const ETH_ADDRESS: AssetAddress = 'Ethereum'

describe('addETHAsset', () => {
  test('defined', () => {
    expect(addETHAsset).toBeDefined()
  })

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
