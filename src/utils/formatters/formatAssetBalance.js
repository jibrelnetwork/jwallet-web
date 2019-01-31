// @flow

import { divDecimals, formatBalance } from 'utils/numbers'
import { checkETH } from 'utils/digitalAssets'

export default function formatAssetBalance(
  asset: AssetAddress,
  balance: BigNumber | string | number | void,
  decimals?: number = 18,
): string {
  return formatBalance(
    divDecimals(balance, decimals),
    checkETH(asset) ? 4 : 2,
  )
}
