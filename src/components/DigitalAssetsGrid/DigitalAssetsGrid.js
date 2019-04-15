// @flow

import React, { PureComponent } from 'react'

import { AssetItem } from 'components/AssetItemNew/AssetItem'

type Props = {|
  +items: DigitalAssetWithBalance[],
  // +fiatCurrency: FiatCurrency
|}

class DigitalAssetsGrid extends PureComponent<Props> {
  render() {
    const {
      items,
      // fiatCurrency,
    } = this.props

    return (
      <ul className='digital-assets-grid'>
        {items.map(({
          blockchainParams: {
            address,
          },
          // fiatBalance,
        }: DigitalAssetWithBalance) => (
          <li key={address}>
            <AssetItem
              address={address}
            />
          </li>
        ))}
      </ul>
    )
  }
}

export default DigitalAssetsGrid
