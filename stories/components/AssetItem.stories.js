// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import AssetItem from 'components/AssetItem'

storiesOf('AssetItem')

  .add('Default', () => (
    <div className='story'>
      <h2>Default</h2>
      <AssetItem
        remove={console.log}
        name='Ethereum'
        symbol='ETH'
        address='0x05360d2b7d240ec0643b6d819ba81a09e40e5bcd'
        balance='100325.578'
      />
      <h2>Is custom</h2>
      <AssetItem
        remove={console.log}
        name='Ethereum'
        symbol='ETH'
        address='0x05360d2b7d240ec0643b6d819ba81a09e40e5bcd'
        balance='100325.578'
        isCustom
      />
    </div>
  ))
