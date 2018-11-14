// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import AddDigitalAsset from 'components/DigitalAssetsGrid/AddDigitalAsset'

storiesOf('AddDigitalAsset')
  .add('Default', () => (
    <div className='story'>
      <h2>Default</h2>
      <AddDigitalAsset />
    </div>
  ))
