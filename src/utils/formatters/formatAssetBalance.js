// @flow

import checkETH from 'utils/digitalAssets/checkETH'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import type { ToBigNumberValue } from 'utils/numbers/toBigNumber'

export default function formatAssetBalance(
  asset: AssetAddress,
  balance: ToBigNumberValue,
  decimals?: number = 18,
): string {
  return formatBalance(
    divDecimals(balance, decimals),
    checkETH(asset) ? 4 : 2,
  )
}
