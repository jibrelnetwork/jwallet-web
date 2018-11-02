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
        {items.map(item => (
          <div className='box' key={item.asset.address}>
            { /* @TODO: add fiatCurrency, fiatBalance */ }
            <Asset
              {...item.asset}
              {...item.balance}
            />
          </div>
        )
        )}
      </div>
    )
  }
}

export default DigitalAssetsGrid
