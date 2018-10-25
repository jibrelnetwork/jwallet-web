// @flow

import React, { PureComponent } from 'react'

// import { filterDigitalAssets, filterFoundDigitalAssets } from 'utils/digitalAssets'

import Asset from './Asset'
import Empty from './Empty'

type Props = {
  openView: () => void,
  closeView: () => void,
  items: DigitalAssets,
  balances: DigitalAssetBalances,
}

class DigitalAssetsGrid extends PureComponent<Props> {
  componentDidMount() {
    console.log('MOUNT DigitalAssetsGrid')
    this.props.openView()
  }

  componentWillUnmount() {
    console.log('UNMOUNT DigitalAssetsGrid')
    this.props.closeView()
  }

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
