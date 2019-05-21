// @flow

import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import {
  JAssetSymbol,
  JIcon,
  JLink,
  JShimmer,
} from 'components/base'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'
import { selectBalanceByAssetAddressToCurrentBlock } from 'store/selectors/balances'
import { selectSettingsFiatCurrencyData } from 'store/selectors/settings'
import { getFiatBalance } from 'store/utils/getFiatBalances'
import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'
import { checkBalanceLoading } from 'utils/digitalAssets'
import { formatAssetBalance } from 'utils/formatters'
import { type ToBigNumberValue } from 'utils/numbers/toBigNumber'

import offsetsStyle from 'styles/offsets.m.scss'
import assetItemStyle from 'pages/Home/components/AssetItem/assetItem.m.scss'

type ContainerProps = {|
  +address: AssetAddress,
|}

type Props = {|
  ...$Exact<ContainerProps>,
  ...$Exact<DigitalAssetWithBalance>,
  balance: ToBigNumberValue,
  fiatSymbol: string,
  fiatBalance: string,
  isLoadingBalance: boolean,
|}

export function AssetItemInternal({
  symbol,
  address,
  balance,
  name,
  fiatSymbol,
  fiatBalance,
  blockchainParams,
  isLoadingBalance,
}: Props) {
  // FIXME: move formatters to external file
  const formattedBalance = `${formatAssetBalance(
    address,
    balance,
    blockchainParams.decimals,
  )}\u00A0${symbol}`

  const formattedFiatBalance = `${fiatSymbol}\u202F${formatBalance(divDecimals(fiatBalance))}`

  return (
    <JLink
      className={`__asset-item ${assetItemStyle.core} ${offsetsStyle.mb16}`}
      href={`/assets/${address}`}
    >
      <div
        className={classNames(assetItemStyle.item, assetItemStyle.assetIcon)}
      >
        <JAssetSymbol
          address={address}
          symbol={symbol}
          color='blue'
          size={32}
        />
      </div>
      <div
        className={classNames(assetItemStyle.item, assetItemStyle.mainBlock)}
      >
        <div className={assetItemStyle.text}>
          {name}
        </div>
        <div className={assetItemStyle.subtext}>
          {symbol}
        </div>
      </div>
      <div
        className={classNames(assetItemStyle.item, assetItemStyle.amountBlock)}
      >
        <div className={`${assetItemStyle.assetAmount} ${assetItemStyle.text}`}>
          {isLoadingBalance
            ? <JShimmer />
            : formattedBalance}
        </div>
        <div
          className={`${assetItemStyle.assetAmount} ${assetItemStyle.subtext}`}
          style={{ minWidth: '80px' }}
        >
          {isLoadingBalance
            ? <JShimmer />
            : formattedFiatBalance}
        </div>
      </div>
      <div
        className={classNames(assetItemStyle.item, assetItemStyle.arrowIcon)}
      >
        <JIcon className={assetItemStyle.arrow} name='arrow-right-use-fill' />
      </div>
    </JLink>
  )
}

export const AssetItem =
  connect<Props, ContainerProps, _, _, _, _>(
    (state: AppState, ownProps: ContainerProps) => {
      const asset = selectDigitalAssetsItems(state)[ownProps.address]

      if (!asset) {
        return { ...ownProps }
      }

      const balance = selectBalanceByAssetAddressToCurrentBlock(state, ownProps.address)
      const { symbol: fiatSymbol } = selectSettingsFiatCurrencyData(state)
      const fiatBalance = getFiatBalance(state, {
        ...asset,
        balance,
      })

      return {
        ...asset,
        balance: balance ? balance.value : 0,
        isLoadingBalance: checkBalanceLoading(balance),
        fiatSymbol,
        fiatBalance,
      }
    },
  )(AssetItemInternal)
