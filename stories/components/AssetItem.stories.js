// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import AssetItem from 'components/AssetItem'
import ethereum from 'data/assets/ethereum'

storiesOf('AssetItem')

  .add('Default', () => (
    <div className='story'>
      <h2>Default</h2>
      <AssetItem
        remove={console.log}
        name={ethereum.name}
        symbol={ethereum.symbol}
        address={ethereum.address}
        balance={100325.578}
      />
      <h2>Is custom</h2>
      <AssetItem
        remove={console.log}
        name={ethereum.name}
        symbol={ethereum.symbol}
        address={ethereum.address}
        balance={100325.578}
        isCustom
      />
    </div>
  ))
