// @flow

import React, { PureComponent } from 'react'

// import { filterDigitalAssets, filterFoundDigitalAssets } from 'utils/digitalAssets'

import Asset from './Asset'
import Empty from './Empty'

export type DigitalAssetsGridItemType = {
  asset: DigitalAsset,
  balance: ?DigitalAssetsBalance,
}

type Props = {
  items: Array<DigitalAssetsGridItemType>,
}

class DigitalAssetsGrid extends PureComponent<Props> {
  render() {
    const {
      items,
    } = this.props

    return (
      <div className='digital-assets-grid'>
        {items.length === 0 && <Empty />}
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
        )
        )}
      </div>
    )
  }
}

export default DigitalAssetsGrid
