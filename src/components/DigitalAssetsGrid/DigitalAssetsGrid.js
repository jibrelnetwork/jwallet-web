// @flow

import React, { PureComponent } from 'react'

import parseBalance from 'utils/digitalAssets/parseBalance'

import Asset from './Asset'
import DigitalAssetsGridEmpty from './Empty'
import AddDigitalAsset from './AddDigitalAsset'

type Props = {|
  +addAssetClick: () => void,
  +items: DigitalAssetWithBalance[],
|}

class DigitalAssetsGrid extends PureComponent<Props> {
  render() {
    const {
      addAssetClick,
      items,
    } = this.props

    return (
      <div className='digital-assets-grid'>
        {items.map(({
          balance,
          name,
          symbol,
          address,
          decimals,
          isCustom,
        }: DigitalAssetWithBalance) => (
          <div className='box' key={address}>
            { /* @TODO: add fiatCurrency, fiatBalance */ }
            <Asset
              name={name}
              symbol={symbol}
              address={address}
              balance={balance ? parseBalance(balance.value, decimals) : '0'}
              isCustom={isCustom}
              isError={balance ? !!balance.isError : false}
              isLoading={balance ? balance.isLoading : true}
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
