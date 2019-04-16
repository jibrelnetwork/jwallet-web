// @flow

import React, { PureComponent } from 'react'

import { AssetItemNew } from 'components'

type Props = {|
  +items: AssetAddress[],
|}

class DigitalAssetsGrid extends PureComponent<Props> {
  render() {
    return (
      <ul className='digital-assets-grid'>
        {this.props.items.map((address: AssetAddress) => (
          <li key={address}>
            <AssetItemNew
              address={address}
            />
          </li>
        ))}
      </ul>
    )
  }
}

export default DigitalAssetsGrid
