// @flow

import React, { PureComponent } from 'react'

import AssetItem from '../AssetItem'
import Empty from './Empty'

export type DigitalAssetsGridItemType = {
  asset: DigitalAsset,
  balance: ?DigitalAssetsBalance,
}

type Props = {
  items: Array<DigitalAssetsGridItemType>,
  deleteCustomAsset: (Address) => void,
  setAssetIsActive: (Address, boolean) => void,
}

class DigitalAssetsGrid extends PureComponent<Props> {
  render() {
    const {
      items,
      deleteCustomAsset,
      setAssetIsActive,
    } = this.props

    return (
      <div className='digital-assets-manager'>
        {items.length === 0 && <Empty />}
        {items.map(({ asset, balance }) => (
          <div className='box' key={asset.address}>
            <AssetItem
              address={asset.address}
              name={asset.name}
              symbol={asset.symbol}
              isCustom={asset.isCustom}
              balance={balance ? balance.balance : 0}
              setIsActive={(isActive: boolean) => setAssetIsActive(asset.address, isActive)}
              deleteAssetItem={() => deleteCustomAsset(asset.address)}
            />
          </div>
        )
        )}
      </div>
    )
  }
}

export default DigitalAssetsGrid
