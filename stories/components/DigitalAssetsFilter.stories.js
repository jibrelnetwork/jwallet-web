// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import DigitalAssetsFilter from 'components/DigitalAssetsFilter'

storiesOf('DigitalAssetsFilter')
  .add('Default', () => (
    <div className='story'>
      <h2>Default</h2>
      <div className='inline align-right'>
        <DigitalAssetsFilter />
      </div>
    </div>
  ))
