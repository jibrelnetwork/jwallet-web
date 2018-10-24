// @flow

import React, { PureComponent } from 'react'

import { JCard } from 'components/base'
// import { filterDigitalAssets, filterFoundDigitalAssets } from 'utils/digitalAssets'

import Asset from './Asset'
import Empty from './Empty'

type Props = {
  openView: () => void,
  closeView: () => void,
  items: DigitalAssets,
  balances: DigitalAssetBalances,
}

class DigitalAssetsList extends PureComponent<Props> {
  componentDidMount() {
    console.log('MOUNT DigitalAssetsList')
    this.props.openView()
  }

  componentWillUnmount() {
    console.log('UNMOUNT DigitalAssetsList')
    this.props.closeView()
  }

  render() {
    const {
      items,
      balances,
    } = this.props

    return (
      <div className='digital-assets-list'>
        {items.length === 0 && <Empty />}
        {items.map((asset) => {
          const balance = balances[asset.address] || {
            isLoading: true,
          }

          return (
            <JCard key={asset.address}>
              { /* @TODO: add fiatCurrency, fiatBalance */ }
              <Asset
                {...asset}
                {...balance}
              />
            </JCard>
          )
        }
        )}
      </div>
    )
  }
}

export default DigitalAssetsList
