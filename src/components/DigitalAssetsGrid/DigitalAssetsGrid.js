// @flow

import React, { PureComponent } from 'react'

import checkBalanceLoading from 'utils/digitalAssets/checkBalanceLoading'

import { formatAssetBalance } from 'utils/formatters'

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
          blockchainParams: {
            address,
            decimals,
          },
          balance,
          name,
          symbol,
          isCustom,
        }: DigitalAssetWithBalance) => (
          <div className='box' key={address}>
            <Asset
              name={name}
              symbol={symbol}
              address={address}
              balance={formatAssetBalance(address, balance ? balance.value : 0, decimals)}
              isCustom={isCustom}
              isError={!!balance && !!balance.isError}
              isLoading={checkBalanceLoading(balance)}
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
