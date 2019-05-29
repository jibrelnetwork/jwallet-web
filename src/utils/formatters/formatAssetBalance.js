// @flow

import checkETH from 'utils/digitalAssets/checkETH'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import { type ToBigNumberValue } from 'utils/numbers/toBigNumber'

export function formatAssetBalance(
  asset: AssetAddress,
  balance: ToBigNumberValue,
  decimals?: number = 18,
  symbol?: ?string = null,
): string {
  return `${formatBalance(
    divDecimals(balance, decimals),
    checkETH(asset) ? 4 : 2,
  )}${symbol ? `\u00A0${symbol}` : ''}`
}
