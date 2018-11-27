// @flow

import React, { PureComponent } from 'react'

import Asset from './Asset'
import DigitalAssetsGridEmpty from './Empty'
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
        {items.map(({ asset, balance, isLoading }) => (
          <div className='box' key={asset.address}>
            { /* @TODO: add fiatCurrency, fiatBalance */ }
            <Asset
              name={asset.name}
              symbol={asset.symbol}
              address={asset.address}
              isCustom={asset.isCustom}
              balance={balance}
              isLoading={isLoading}
              isError={false}
            />
          </div>
        ))}
        {!items.length ? <DigitalAssetsGridEmpty /> : (
          <div className='box'>
            <AddDigitalAsset onClick={addAssetClick} />
          </div>
        )}
      </div>
    )
  }
}

export default DigitalAssetsGrid
