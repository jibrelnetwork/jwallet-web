// @flow

import React, { Component } from 'react'

import AssetItem from 'components/AssetItemLegacy'
import { formatAssetBalance } from 'utils/formatters'

import Empty from './Empty'

type Props = {|
  +deleteCustomAsset: (Address) => void,
  +setAssetIsActive: (Address, boolean) => void,
  +items: DigitalAssetWithBalance[],
|}

class DigitalAssetsManage extends Component<Props> {
  render() {
    const {
      deleteCustomAsset,
      items,
      setAssetIsActive,
    } = this.props

    return (
      <div className='digital-assets-manage'>
        {!items.length && <Empty />}
        {items.map(({
          blockchainParams: {
            address,
            decimals,
          },
          balance,
          name,
          symbol,
          isActive,
          isCustom,
        }) => (
          <div className='box' key={address}>
            <AssetItem
              remove={deleteCustomAsset}
              setIsActive={setAssetIsActive}
              name={name}
              symbol={symbol}
              address={address}
              balance={formatAssetBalance(address, balance ? balance.value : 0, decimals)}
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
