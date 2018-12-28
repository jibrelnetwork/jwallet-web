// @flow

import React, { Component } from 'react'

import AssetItem from 'components/AssetItem'
import handle from 'utils/eventHandlers/handle'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import Empty from './Empty'

type Props = {|
  +editAsset: (Address) => void,
  +deleteCustomAsset: (Address) => void,
  +setAssetIsActive: (Address, boolean) => void,
  +items: DigitalAssetWithBalance[],
|}

class DigitalAssetsManage extends Component<Props> {
  setAssetIsActive = (address: AssetAddress) => (isActiveNew: boolean) =>
    this.props.setAssetIsActive(address, isActiveNew)

  render() {
    const {
      editAsset,
      deleteCustomAsset,
      items,
    } = this.props

    return (
      <div className='digital-assets-manage'>
        {!items.length && <Empty />}
        {items.map(({
          balance,
          name,
          symbol,
          address,
          decimals,
          isActive,
          isCustom,
        }) => (
          <div className='box' key={address}>
            <AssetItem
              edit={handle(editAsset)(address)}
              remove={handle(deleteCustomAsset)(address)}
              setIsActive={this.setAssetIsActive(address)}
              name={name}
              symbol={symbol}
              address={address}
              balance={formatBalance(divDecimals(balance ? balance.value : 0, decimals))}
              isCustom={isCustom}
              isActive={isActive}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default DigitalAssetsManage
