// @flow

import transformation from 'utils/digitalAssets/transformation'
import assetsMain from 'assets/mainnet/assets'

// Add here addresses if asset `isCustom`
const customAssets = [
  '0xeccab39acb2caf9adba72c1cb92fdc106b993e0b',
]

// test it with address
// 0x4Bda106325C335dF99eab7fE363cAC8A0ba2a24D
console.log(transformation)
const MAIN_ASSETS = transformation(assetsMain, customAssets)
console.log(MAIN_ASSETS)

export default MAIN_ASSETS
