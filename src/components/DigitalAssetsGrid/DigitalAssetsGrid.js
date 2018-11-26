// @flow

import React, { PureComponent } from 'react'

import Asset from './Asset'
import Empty from './Empty'
import AddDigitalAsset from './AddDigitalAsset'

type Props = {|
  +items: Array<DigitalAssetsGridItemType>,
  +addAssetClick: () => void,
|}

class DigitalAssetsGrid extends PureComponent<Props> {
  render() {
    const {
      items,
      addAssetClick,
    } = this.props

    return (
      <div className='digital-assets-grid'>
        {items.map(({ asset, balance }) => (
          <div className='box' key={asset.address}>
            { /* @TODO: add fiatCurrency, fiatBalance */ }
            <Asset
              name={asset.name}
              symbol={asset.symbol}
              address={asset.address}
              isCustom={asset.isCustom}
              balance={balance ? balance.balance : 0}
              isLoading={balance ? balance.isLoading : false}
              isError={balance ? balance.isError : false}
            />
          </div>
        ))}
        {items.length ? (
          <div className='box'>
            <AddDigitalAsset onClick={addAssetClick} />
          </div>
        ) : (
          <Empty
            image='screen-search'
            description='There are no Digital Assets to show'
            color='gray'
            isTransparent
          />
        )}
      </div>
    )
  }
}

export default DigitalAssetsGrid
