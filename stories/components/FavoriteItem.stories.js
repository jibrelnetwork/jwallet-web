// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import FavoriteItem from 'components/FavoriteItem'

storiesOf('FavoriteItem')

  .add('Default', () => (
    <div className='story'>
      <h2>Default</h2>
      <FavoriteItem
        send={console.log}
        remove={console.log}
        name='Alexey Selikhov'
        symbol='AS'
        address='0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd'
      />
    </div>
  ))
