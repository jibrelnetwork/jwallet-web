// @flow

import React, { PureComponent } from 'react'

// import { filterDigitalAssets, filterFoundDigitalAssets } from 'utils/digitalAssets'

import Asset from './Asset'
import Empty from './Empty'

type Props = {
  items: DigitalAssets,
  balances: DigitalAssetBalances,
}

class DigitalAssetsGrid extends PureComponent<Props> {
  render() {
    const {
      items,
      balances,
    } = this.props

    return (
      <div className='digital-assets-grid'>
        {items.length === 0 && <Empty />}
        {items.map((asset) => {
          const balance = balances[asset.address] || {
            isLoading: true,
          }

          return (
            <div className='box' key={asset.address}>
              { /* @TODO: add fiatCurrency, fiatBalance */ }
              <Asset
                {...asset}
                {...balance}
              />
            </div>
          )
        }
        )}
      </div>
    )
  }
}

export default DigitalAssetsGrid
