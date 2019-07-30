// @flow strict

import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import checkETH from 'utils/digitalAssets/checkETH'

import offsetsStyle from 'styles/offsets.m.scss'
import { selectDigitalAssetsItems } from 'store/selectors/digitalAssets'

import {
  JAssetSymbol,
  JSwitch,
} from 'components/base'

import styles from './assetItem.m.scss'

type HandleItemCheckFunction = (address: string, isChecked: boolean) => any

type OwnProps = {|
  +address: AssetAddress,
  +isChecked: boolean,
  +onCheck: HandleItemCheckFunction,
|}

type Props = {|
  ...$Exact<OwnProps>,
  ...$Exact<DigitalAsset>,
|}

const handleAssetCheck = (address: string, handleCheck: HandleItemCheckFunction) =>
  (isChecked: boolean) => handleCheck(address, isChecked)

function ManageAssetItem({
  symbol,
  address,
  name,
  isChecked,
  onCheck: handleCheck,
}: Props) {
  return (
    <div
      className={`__asset-item ${styles.core} ${offsetsStyle.mb16}`}
    >
      <div
        className={classNames(styles.item, styles.assetIcon)}
      >
        <JAssetSymbol
          address={address}
          symbol={symbol}
          color='blue'
          size={32}
        />
      </div>
      <div
        className={classNames(styles.item, styles.mainBlock)}
      >
        <div className={styles.text}>
          {name}
        </div>
        <div className={styles.subtext}>
          {symbol}
        </div>
      </div>
      <div
        className={classNames(styles.item, styles.arrowIcon)}
      >
        <JSwitch
          name={`asset-${address}`}
          onChange={handleAssetCheck(address, handleCheck)}
          isChecked={isChecked}
          isDisabled={checkETH(address)}
        />
      </div>
    </div>
  )
}

function mapStateToProps(state: AppState, { address }: OwnProps) {
  const digitalAssets: DigitalAssets = selectDigitalAssetsItems(state)
  const asset: ?DigitalAsset = digitalAssets[address]

  if (!asset) {
    return { address }
  }

  return {
    ...asset,
  }
}

const ManageAssetItemEnhanced = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
)(ManageAssetItem)

export { ManageAssetItemEnhanced as ManageAssetItem }
