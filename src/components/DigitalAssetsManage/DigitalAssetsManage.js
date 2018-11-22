// @flow

import React, { PureComponent } from 'react'
import { handle } from 'utils/eventHandlers'

import AssetItem from '../AssetItem'
import Empty from './Empty'

type Props = {|
  +items: Array<DigitalAssetsGridItemType>,
  +deleteCustomAsset: (Address) => void,
  +editAsset: (Address) => void,
  +setAssetIsActive: (Address, boolean) => void,
|}

class DigitalAssetsGrid extends PureComponent<Props> {
  render() {
    const {
      items,
      deleteCustomAsset,
      setAssetIsActive,
      editAsset,
    } = this.props

    return (
      <div className='digital-assets-manage'>
        {items.length === 0 && <Empty />}
        {items.map(({ asset, balance }) => (
          <div className='box' key={asset.address}>
            <AssetItem
              address={asset.address}
              name={asset.name}
              symbol={asset.symbol}
              isCustom={asset.isCustom}
              isActive={asset.isActive}
              balance={balance ? balance.balance : 0}
              setIsActive={(isActive: boolean) => setAssetIsActive(asset.address, isActive)}
              deleteAssetItem={handle(deleteCustomAsset)(asset.address)}
              editAssetItemClick={handle(editAsset)(asset.address)}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default DigitalAssetsGrid
