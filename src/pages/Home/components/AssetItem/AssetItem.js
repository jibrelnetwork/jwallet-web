// @flow strict

import React from 'react'
import classNames from 'classnames'
// $FlowFixMe
import BigNumber from 'bignumber.js'
import { connect } from 'react-redux'

import offsetsStyle from 'styles/offsets.m.scss'
import { selectFiatCurrency } from 'store/selectors/user'
import { selectTickerItems } from 'store/selectors/ticker'
import { type ToBigNumberValue } from 'utils/numbers/toBigNumber'
import { selectBalanceByAssetAddress } from 'store/selectors/balances'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'

import {
  getFiatBalance,
  checkBalanceLoading,
} from 'utils/digitalAssets'

import {
  formatFiatBalance,
  formatAssetBalance,
} from 'utils/formatters'

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
  +fiatBalance: ?BigNumber,
  +fiatCurrency: FiatCurrencyCode,
  +isLoadingBalance: boolean,
|}

function AssetItem({
  symbol,
  address,
  balance,
  name,
  fiatBalance,
  fiatCurrency,
  blockchainParams,
  isLoadingBalance,
}: Props) {
  return (
    <JLink
      className={`__asset-item ${styles.core} ${offsetsStyle.mb16}`}
      href={`/assets/${address}`}
    >
      <div className={classNames(styles.item, styles.assetIcon)}>
        <JAssetSymbol
          symbol={symbol}
          address={address}
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
          {isLoadingBalance ? <JShimmer /> : formatAssetBalance(
            address,
            balance,
            blockchainParams.decimals,
            symbol,
          )}
        </div>
        <div
          className={`${styles.assetAmount} ${styles.subtext}`}
          style={{ minWidth: '80px' }}
        >
          {isLoadingBalance ? <JShimmer /> : formatFiatBalance(
            fiatBalance,
            fiatCurrency,
          )}
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

  const fiatBalance: ?BigNumber = getFiatBalance(
    {
      ...asset,
      balance,
    },
    fiatCourses,
    fiatCurrency,
  )

  return {
    ...asset,
    fiatBalance,
    fiatCurrency,
    balance: balance ? balance.value : 0,
    isLoadingBalance: checkBalanceLoading(balance),
  }
}

const AssetItemEnhanced = connect<Props, OwnProps, _, _, _, _>(mapStateToProps)(AssetItem)
export { AssetItemEnhanced as AssetItem }
