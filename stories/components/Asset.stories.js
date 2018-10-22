// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import AssetCard from 'components/DigitalAssets/Asset'

storiesOf('AssetCard')

  .add('Default', () => (
    <div className='story'>
      <h2>Default</h2>
      <AssetCard balance='100325' fiatBalance='2020' />
    </div>
  ))
  .add('Loading', () => (
    <div className='story'>
      <h2>Loading</h2>
      <AssetCard balance='100325' fiatBalance='2020' isLoading />
    </div>
  ))
  .add('No USD', () => (
    <div className='story'>
      <h2>No USD</h2>
      <AssetCard balance='100325' fiatBalance='0' />
    </div>
  ))
  .add('Long loading Error', () => (
    <div className='story'>
      <h2>Long loading Error</h2>
      <AssetCard balance='100325' fiatBalance='2020' isLongLoading />
    </div>
  ))
