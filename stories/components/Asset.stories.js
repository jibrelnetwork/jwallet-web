// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import AssetCard from 'components/DigitalAssetsList/Asset'
import ethereum from 'data/assets/ethereum'

storiesOf('AssetCard')
  .add('Default', () => (
    <div className='story'>
      <h2>Default</h2>
      <AssetCard
        name={ethereum.name}
        symbol={ethereum.symbol}
        address={ethereum.address}
        fiatCurrency='EU'
        balance={100325.578}
        fiatBalance={2020.889}
      />
    </div>
  ))
  .add('Loading', () => (
    <div className='story'>
      <h2>Loading</h2>
      <AssetCard
        name={ethereum.name}
        symbol={ethereum.symbol}
        address={ethereum.address}
        fiatCurrency='USD'
        balance={100325}
        fiatBalance={2020}
        isLoading
      />
    </div>
  ))
  .add('No USD', () => (
    <div className='story'>
      <h2>No USD</h2>
      <AssetCard
        name={ethereum.name}
        symbol={ethereum.symbol}
        address={ethereum.address}
        fiatCurrency='EU'
        balance={100325}
        fiatBalance={0}
      />
    </div>
  ))
  .add('Error loading', () => (
    <div className='story'>
      <h2>Error loading</h2>
      <AssetCard
        name={ethereum.name}
        symbol={ethereum.symbol}
        address={ethereum.address}
        fiatCurrency='USD'
        balance={100325}
        fiatBalance={2020}
        isError
      />
    </div>
  ))
