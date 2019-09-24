// @flow strict

import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import offsetsStyle from 'styles/offsets.m.scss'
import { CURRENCIES } from 'data'
import { formatAssetBalance } from 'utils/formatters'
import { selectFiatCurrency } from 'store/selectors/user'
import { selectTickerItems } from 'store/selectors/ticker'
import { type ToBigNumberValue } from 'utils/numbers/toBigNumber'
import { selectBalanceByAssetAddress } from 'store/selectors/balances'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import {
  getFiatBalance,
  checkBalanceLoading,
} from 'utils/digitalAssets'

import {
  JAssetSymbol,
  JIcon,
  JLink,
  JShimmer,
} from 'components/base'

import styles from './assetItem.m.scss'

type OwnProps = {|
  +address: AssetAddress,
|}

type Props = {|
  ...$Exact<OwnProps>,
  ...$Exact<DigitalAssetWithBalance>,
  +balance: ToBigNumberValue,
  +fiatSymbol: string,
  +fiatBalance: number,
  +isLoadingBalance: boolean,
|}

function AssetItem({
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
  const formattedBalance = formatAssetBalance(
    address,
    balance,
    blockchainParams.decimals,
    symbol,
  )

  const formattedFiatBalance = `${fiatSymbol}\u202F${formatBalance(divDecimals(fiatBalance))}`

  return (
    <JLink
      className={`__asset-item ${styles.core} ${offsetsStyle.mb16}`}
      href={`/assets/${address}`}
    >
      <div className={classNames(styles.item, styles.assetIcon)}>
        <JAssetSymbol
          address={address}
          symbol={symbol}
          color='blue'
          size={32}
        />
      </div>
      <div className={classNames(styles.item, styles.mainBlock)}>
        <div className={styles.text}>
          {name}
        </div>
        <div className={styles.subtext}>
          {symbol}
        </div>
      </div>
      <div className={classNames(styles.item, styles.amountBlock)}>
        <div className={`${styles.assetAmount} ${styles.text}`}>
          {isLoadingBalance
            ? <JShimmer />
            : formattedBalance}
        </div>
        <div
          className={`${styles.assetAmount} ${styles.subtext}`}
          style={{ minWidth: '80px' }}
        >
          {isLoadingBalance
            ? <JShimmer />
            : formattedFiatBalance}
        </div>
      </div>
      <div className={classNames(styles.item, styles.arrowIcon)}>
        <JIcon className={styles.arrow} name='arrow-right-use-fill' />
      </div>
    </JLink>
  )
}

function mapStateToProps(state: AppState, { address }: OwnProps) {
  const digitalAssets: DigitalAssets = selectDigitalAssetsItems(state)
  const asset: ?DigitalAsset = digitalAssets[address]

  if (!asset) {
    return { address }
  }

  const fiatCourses: FiatCourses = selectTickerItems(state)
  const fiatCurrency: FiatCurrencyCode = selectFiatCurrency(state)

  const balance: ?Balance = selectBalanceByAssetAddress(
    state,
    address,
  )

  const fiatBalance: number = getFiatBalance(
    {
      ...asset,
      balance,
    },
    fiatCourses,
    fiatCurrency,
  ) || 0

  return {
    ...asset,
    fiatBalance,
    balance: balance ? balance.value : 0,
    fiatSymbol: CURRENCIES[fiatCurrency].symbol,
    isLoadingBalance: checkBalanceLoading(balance),
  }
}

const AssetItemEnhanced = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(AssetItem)

export { AssetItemEnhanced as AssetItem }
