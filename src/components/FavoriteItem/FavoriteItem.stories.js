// @flow

import React from 'react'
import { storiesOf } from '@storybook/react'

import FavoriteItem from 'components/FavoriteItem'

/* eslint-disable max-len, react/jsx-handler-names */

storiesOf('FavoriteItem')

  .add('Default', () => (
    <div className='story'>
      <h2>Default</h2>
      <FavoriteItem
        onClickSend={console.log}
        onClickRemove={console.log}
        onClickEdit={console.log}
        title='Alexey Selikhov'
        symbol='AS'
        address='0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd'
      />
      <h2>With comment</h2>
      <FavoriteItem
        onClickSend={console.log}
        onClickRemove={console.log}
        onClickEdit={console.log}
        title='Alexey Selikhov'
        description='Dude!'
        symbol='AS'
        address='0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd'
      />
      <h2>With overflow</h2>
      <FavoriteItem
        onClickSend={console.log}
        onClickRemove={console.log}
        onClickEdit={console.log}
        title='Alexey Selikhov Alexey Selikhov Alexey Selikhov Alexey Selikhov Alexey Selikhov'
        description='The best human in the world you could ever lorem ipsum dolor sit amen and all those other words that I do not remember because I am not some kind of Benedictian or other monk that knows all those mantras by heart, no sir'
        symbol='AS'
        address='0x00360d2b7d240ec0643b6d819ba81a09e40e5bcd'
      />
    </div>
  ))

/* eslint-enable max-len, react/jsx-handler-names */
