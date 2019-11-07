// @flow strict

import mergeDigitalAssets from '../mergeDigitalAssets'

const JNT_SYMBOL: string = 'JNT'
const JNT_NAME: string = 'Jibrel Network Token'
const JNT_ADDRESS: AssetAddress = '0xa5Fd1A791C4dfcaacC963D4F73c6Ae5824149eA7'

const AZBIT_ADDRESS: AssetAddress = '0xeccab39acb2caf9adba72c1cb92fdc106b993e0b'
const AZBIT_ADDRESS_CS: AssetAddress = '0xEccAB39acB2CAF9adBa72C1CB92FDC106B993E0b'

const AZBIT_ASSET: DigitalAsset = {
  blockchainParams: {
    type: 'erc-20',
    address: AZBIT_ADDRESS_CS,
    decimals: 6,
  },
  symbol: 'AZ',
  name: 'Azbit',
  isActive: true,
  isCustom: true,
}

describe('mergeDigitalAssets', () => {
  test('defined', () => {
    expect(mergeDigitalAssets).toBeDefined()
  })

  test('default items are merged correctly', async () => {
    const result: DigitalAssets = await mergeDigitalAssets({})
    const jnt: ?DigitalAsset = result[JNT_ADDRESS]

    if (!jnt) {
      throw new Error('JNT asset not found')
    }

    expect(jnt).toBeDefined()
    expect(jnt.name).toEqual(JNT_NAME)
    expect(jnt.symbol).toEqual(JNT_SYMBOL)
    expect(jnt.blockchainParams).toBeDefined()
    expect(jnt.blockchainParams.address).toEqual(JNT_ADDRESS)
  })

  test('existed items are merged correctly', async () => {
    const result: DigitalAssets = await mergeDigitalAssets({
      [AZBIT_ADDRESS]: AZBIT_ASSET,
    })

    const azbit: ?DigitalAsset = result[AZBIT_ADDRESS_CS]

    if (!azbit) {
      throw new Error('Azbit asset not found')
    }

    expect(azbit).toBeDefined()
    expect(azbit.name).toEqual(AZBIT_ASSET.name)
    expect(azbit.symbol).toEqual(AZBIT_ASSET.symbol)
    expect(azbit.blockchainParams).toBeDefined()
    expect(azbit.blockchainParams.address).toEqual(AZBIT_ADDRESS_CS)
  })

  test('existed non-custom item will be removed', async () => {
    const result: DigitalAssets = await mergeDigitalAssets({
      [AZBIT_ADDRESS]: {
        ...AZBIT_ASSET,
        isActive: false,
        isCustom: false,
      },
    })

    const azbit: ?DigitalAsset = result[AZBIT_ADDRESS_CS]

    expect(azbit).toBeUndefined()
  })

  test('existed non-custom item will not be removed', async () => {
    const result: DigitalAssets = await mergeDigitalAssets({
      [AZBIT_ADDRESS]: {
        ...AZBIT_ASSET,
        isActive: true,
        isCustom: false,
      },
    })

    const azbit: ?DigitalAsset = result[AZBIT_ADDRESS_CS]

    if (!azbit) {
      throw new Error('Azbit asset not found')
    }

    expect(azbit).toBeDefined()
    expect(azbit.isCustom).toBeTruthy()
  })

  test('existed custom item will be converted to non-custom', async () => {
    const result: DigitalAssets = await mergeDigitalAssets({
      [JNT_ADDRESS]: AZBIT_ASSET,
    })

    const jnt: ?DigitalAsset = result[JNT_ADDRESS]

    if (!jnt) {
      throw new Error('JNT asset not found')
    }

    expect(jnt).toBeDefined()
    expect(jnt.isCustom).toBeFalsy()
  })
})
