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
import { checkBalanceLoading } from 'utils/digitalAssets'
import { formatAssetBalance } from 'utils/formatters'
import { type ToBigNumberValue } from 'utils/numbers/toBigNumber'

import offsetsStyle from 'styles/offsets.m.scss'
import assetItemStyle from './assetItem.m.scss'

type ContainerProps = {|
  +address: AssetAddress,
|}

type Props = ContainerProps
  & DigitalAssetWithBalance
  & {
  balance: ToBigNumberValue,
  isLoadingBalance: boolean,
}

function AssetItem(props: Props) {
  // const { asset } = props

  // if (!asset) {
  //   throw new Error(`Asset ${asset} with address ${props.address} is not found!`)
  // }

  const { symbol } = props

  const balance = `${formatAssetBalance(
    props.address,
    props.balance,
    props.blockchainParams.decimals,
  )}\u00A0${props.symbol}`

  return (
    <JLink
      className={`__asset-item ${assetItemStyle.core} ${offsetsStyle.mb16}`}
      href={`/asset/${props.address}`}
    >
      <div
        className={classNames(assetItemStyle.item, assetItemStyle.assetIcon)}
      >
        <JAssetSymbol symbol={symbol} color='blue' />
      </div>
      <div
        className={classNames(assetItemStyle.item, assetItemStyle.mainBlock)}
      >
        <div className={assetItemStyle.text}>
          {props.name}
        </div>
        <div className={assetItemStyle.subtext}>
          {symbol}
        </div>
      </div>
      <div
        className={classNames(assetItemStyle.item, assetItemStyle.amountBlock)}
      >
        <div className={assetItemStyle.assetAmount}>
          {props.isLoadingBalance
            ? <JShimmer />
            : balance}
        </div>
      </div>
      <div
        className={classNames(assetItemStyle.item, assetItemStyle.arrowIcon)}
      >
        <JIcon className={assetItemStyle.arrow} name='arrow-right' />
      </div>
    </JLink>
  )
}

function mapStateToProps(state: AppState, props: ContainerProps) {
  const asset = selectDigitalAssetsItems(state)[props.address]

  if (!asset) {
    return { ...props }
  }

  const balance = selectBalanceByAssetAddressToCurrentBlock(state, props.address)

  return {
    ...asset,
    balance: balance ? balance.value : 0,
    isLoadingBalance: checkBalanceLoading(balance),
  }
}

const ConnectedAssetItem =
  connect/* :: <AppState, ContainerProps, Props, _, _> */(mapStateToProps)(AssetItem)

export {
  ConnectedAssetItem as AssetItem,
  AssetItem as PureAssetItem,
}
