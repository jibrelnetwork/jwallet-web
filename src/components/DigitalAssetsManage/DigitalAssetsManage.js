// @flow

import React, { PureComponent } from 'react'

import AssetItem from 'components/AssetItem'
import handle from 'utils/eventHandlers/handle'
import parseBalance from 'utils/digitalAssets/parseBalance'

import Empty from './Empty'

type Props = {|
  +editAsset: (Address) => void,
  +deleteCustomAsset: (Address) => void,
  +setAssetIsActive: (Address, boolean) => void,
  +items: DigitalAssetWithBalance[],
|}

class DigitalAssetsGrid extends PureComponent<Props> {
  render() {
    const {
      editAsset,
      deleteCustomAsset,
      setAssetIsActive,
      items,
    } = this.props

    return (
      <div className='digital-assets-manage'>
        {items.length === 0 && <Empty />}
        {items.map(({
          balance,
          name,
          symbol,
          address,
          decimals,
          isActive,
          isCustom,
        }) => (
          <div className='box' key={address}>
            <AssetItem
              edit={handle(editAsset)(address)}
              remove={handle(deleteCustomAsset)(address)}
              setIsActive={(isActiveNew: boolean) => setAssetIsActive(address, isActiveNew)}
              name={name}
              symbol={symbol}
              address={address}
              balance={balance ? parseBalance(balance.value, decimals) : '0'}
              isCustom={isCustom}
              isActive={isActive}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default DigitalAssetsGrid
