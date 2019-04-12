// @flow

import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'

import {
  JAssetSymbol, JIcon, JLink,
} from 'components/base'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'
import { selectBalanceByAssetAddressToCurrentBlock } from 'store/selectors/balances'
import { formatAssetBalance } from 'utils/formatters'

import offsetsStyle from 'styles/offsets.m.scss'
import assetItemStyle from './assetItem.m.scss'

type ContainerProps = {|
  +address: Address,
|}

type Props = ContainerProps & { asset: DigitalAssetWithBalance }

class AssetItem extends PureComponent<Props> {
  render() {
    const { asset } = this.props

    const balance = `${formatAssetBalance(
      this.props.address,
      asset.balance.value,
      asset.blockchainParams.decimals,
    )}\u202F${asset.symbol}`

    return (
      <JLink
        className={`__asset-item ${assetItemStyle.core} ${offsetsStyle.mb16}`}
        href={`/asset/${this.props.address}`}
      >
        <div
          className={classNames(assetItemStyle.item, assetItemStyle.assetIcon)}
        >
          <JAssetSymbol symbol={asset.symbol} color='blue' />
        </div>
        <div
          className={classNames(assetItemStyle.item, assetItemStyle.mainBlock)}
        >
          <div className={assetItemStyle.text}>
            {asset.name}
          </div>
          <div className={assetItemStyle.subtext}>
            {asset.symbol}
          </div>
        </div>
        <div
          className={classNames(assetItemStyle.item, assetItemStyle.amountBlock)}
        >
          {asset.balance != null
            ? balance
            : '?' /* FIXME: Temporary solution for debug */}
        </div>
        <div
          className={classNames(assetItemStyle.item, assetItemStyle.arrowIcon)}
        >
          <JIcon className={assetItemStyle.arrow} name='arrow-right' />
        </div>
      </JLink>
    )
  }
}

function mapStateToProps(state: AppState, props: ContainerProps) {
  const asset = selectDigitalAssetsItems(state)[props.address]

  // eslint-disable-next-line fp/no-mutation
  asset.balance = selectBalanceByAssetAddressToCurrentBlock(state, props.address) || {
    isError: true,
    value: 0,
  }

  return {
    ...props,
    asset,
  }
}

const ConnectedAssetItem =
  connect/* :: <AppState, ContainerProps, Props, _, _> */(mapStateToProps)(AssetItem)

export {
  ConnectedAssetItem as AssetItem,
  AssetItem as PureAssetItem,
}
