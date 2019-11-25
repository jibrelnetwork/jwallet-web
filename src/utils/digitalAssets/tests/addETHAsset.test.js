// @flow strict

import addETHAsset from '../addETHAsset'
import { AZBIT_ASSET } from './data'

const ETH_ADDRESS: AssetAddress = 'Ethereum'

const EXISTED_ASSET_LIST: DigitalAssets = {
  [AZBIT_ASSET.blockchainParams.address]: AZBIT_ASSET,
}

describe('addETHAsset', () => {
  test('defined', () => {
    expect(addETHAsset).toBeDefined()
  })

  test('ETH asset will be added correctly', async () => {
    const result: DigitalAssets = await addETHAsset(EXISTED_ASSET_LIST)
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

  test('ETH asset will be added to empty container correctly', async () => {
    const result: DigitalAssets = await addETHAsset({})
    const eth: ?DigitalAsset = result[ETH_ADDRESS]

    if (!eth) {
      throw new Error('ETH asset not found')
    }

    expect(eth).toBeDefined()
    expect(eth.blockchainParams).toBeDefined()
    expect(eth.blockchainParams.address).toEqual(ETH_ADDRESS)
  })

  test('ETH asset will be added twice correctly', async () => {
    const result: DigitalAssets = await addETHAsset(EXISTED_ASSET_LIST)
    const eth: ?DigitalAsset = result[ETH_ADDRESS]

    if (!eth) {
      throw new Error('ETH asset not found')
    }

    expect(eth).toBeDefined()
    expect(eth.blockchainParams).toBeDefined()
    expect(eth.blockchainParams.address).toEqual(ETH_ADDRESS)

    const resultAgain: DigitalAssets = await addETHAsset(result)

    expect(resultAgain).toEqual(result)
  })
})
